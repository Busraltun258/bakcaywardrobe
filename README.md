import { useEffect, useRef, useState, useCallback } from "react";
import { Card, Statistic, Button, Space, Typography } from "antd";

const { Text } = Typography;

// azimuth_speed: -100 → +100  (sol = -100, sağ = +100)
// elevation_speed: -100 → +100  (aşağı = -100, yukarı = +100)

const SIZE = 300;
const CX = 150;
const CY = 150;
const OUTER_R = 130;
const INNER_R = 108;
const KNOB_R = 18;
const MAX_DRAG = 90;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function JoystickController({ onSend }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    dragging: false,
    kx: 0,
    ky: 0,
    displaySpeed: 0,
    targetSpeed: 0,
    dirAngle: 0,
    prevMX: 0,
    prevMY: 0,
    prevT: 0,
    velMag: 0,
    animating: false,
    rafId: null,
  });

  const [azimuthSpeed, setAzimuthSpeed] = useState(0);
  const [elevationSpeed, setElevationSpeed] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [lastSent, setLastSent] = useState(null);

  // azimuth_speed: kx → -100..+100
  const calcAzimuthSpeed = (kx, ky) => {
    const dist = Math.sqrt(kx * kx + ky * ky);
    if (dist < 4) return 0;
    return Math.round((kx / MAX_DRAG) * 100);
  };

  // elevation_speed: -ky → -100..+100 (yukarı pozitif)
  const calcElevationSpeed = (kx, ky) => {
    const dist = Math.sqrt(kx * kx + ky * ky);
    if (dist < 4) return 0;
    return Math.round((-ky / MAX_DRAG) * 100);
  };

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    ctx.clearRect(0, 0, SIZE, SIZE);

    const borderCol = "rgba(60,60,70,0.14)";

    // Outer ring
    ctx.beginPath();
    ctx.arc(CX, CY, OUTER_R, 0, Math.PI * 2);
    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner ring
    ctx.beginPath();
    ctx.arc(CX, CY, INNER_R, 0, Math.PI * 2);
    ctx.strokeStyle = borderCol;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Ticks
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
      const isMajor = i % 10 === 0;
      const isMid = i % 5 === 0;
      const r1 = isMajor ? INNER_R + 4 : isMid ? INNER_R + 3 : INNER_R + 2;
      const r2 = OUTER_R - (isMajor ? 2 : isMid ? 4 : 5);
      const lw = isMajor ? 1.8 : isMid ? 1.2 : 0.8;
      const alpha = isMajor ? 0.9 : isMid ? 0.55 : 0.28;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "rgba(50,50,60,1)";
      ctx.lineWidth = lw;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(CX + Math.cos(a) * r1, CY + Math.sin(a) * r1);
      ctx.lineTo(CX + Math.cos(a) * r2, CY + Math.sin(a) * r2);
      ctx.stroke();
      ctx.restore();
    }

    // Speed arc
    const speedRatio = s.displaySpeed / 100;
    if (speedRatio > 0.01) {
      const arcEnd = -Math.PI / 2 + speedRatio * Math.PI * 2;
      const midR = (INNER_R + OUTER_R) / 2;
      const arcW = OUTER_R - INNER_R - 2;
      ctx.beginPath();
      ctx.arc(CX, CY, midR, -Math.PI / 2, arcEnd);
      ctx.strokeStyle = "rgba(83,74,183,0.45)";
      ctx.lineWidth = arcW;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(CX, CY, OUTER_R - 1, -Math.PI / 2, arcEnd);
      ctx.strokeStyle = "rgba(83,74,183,0.85)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Center dot
    ctx.beginPath();
    ctx.arc(CX, CY, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(60,60,70,0.4)";
    ctx.fill();

    const drawArrow = (fx, fy, angle, len, color, width, hs) => {
      const ex = fx + Math.cos(angle) * len;
      const ey = fy + Math.sin(angle) * len;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      const bx = ex - Math.cos(angle) * hs * 1.6;
      const by = ey - Math.sin(angle) * hs * 1.6;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(bx - Math.sin(angle) * hs, by + Math.cos(angle) * hs);
      ctx.lineTo(bx + Math.sin(angle) * hs, by - Math.cos(angle) * hs);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Direction arrow (teal)
    const dist = Math.sqrt(s.kx * s.kx + s.ky * s.ky);
    if (dist > 4) {
      const dirLen = 60 + (dist / MAX_DRAG) * 30;
      drawArrow(CX, CY, s.dirAngle, dirLen, "#0F6E56", 2.5, 6);
    }

    // Speed arrow (purple, always up)
    const speedLen = 20 + (s.displaySpeed / 100) * 72;
    drawArrow(CX, CY, -Math.PI / 2, speedLen, "#534AB7", 2.5, 6);

    // Knob
    const kclamped = Math.min(dist, MAX_DRAG);
    const ka = Math.atan2(s.ky, s.kx);
    const kkx = CX + Math.cos(ka) * kclamped;
    const kky = CY + Math.sin(ka) * kclamped;
    ctx.beginPath();
    ctx.arc(kkx, kky, KNOB_R, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(250,250,255,0.97)";
    ctx.strokeStyle = "rgba(83,74,183,0.5)";
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(kkx, kky, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(83,74,183,0.6)";
    ctx.fill();
  }, []);

  const updateReactState = useCallback(() => {
    const s = stateRef.current;
    setSpeed(Math.round(s.displaySpeed));
    setAzimuthSpeed(calcAzimuthSpeed(s.kx, s.ky));
    setElevationSpeed(calcElevationSpeed(s.kx, s.ky));
  }, []);

  const animate = useCallback(() => {
    const s = stateRef.current;
    s.displaySpeed = lerp(s.displaySpeed, s.targetSpeed, 0.18);
    if (Math.abs(s.displaySpeed - s.targetSpeed) < 0.3)
      s.displaySpeed = s.targetSpeed;
    drawFrame();
    updateReactState();
    if (Math.abs(s.displaySpeed - s.targetSpeed) > 0.3 || s.dragging) {
      s.rafId = requestAnimationFrame(animate);
    } else {
      s.animating = false;
    }
  }, [drawFrame, updateReactState]);

  const startAnim = useCallback(() => {
    const s = stateRef.current;
    if (!s.animating) {
      s.animating = true;
      s.rafId = requestAnimationFrame(animate);
    }
  }, [animate]);

  const updateKnob = useCallback(
    (mx, my) => {
      const s = stateRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const nx = mx - rect.left - CX;
      const ny = my - rect.top - CY;
      const dist = Math.sqrt(nx * nx + ny * ny);
      s.kx = nx;
      s.ky = ny;
      if (dist > MAX_DRAG) {
        s.kx = (nx / dist) * MAX_DRAG;
        s.ky = (ny / dist) * MAX_DRAG;
      }
      const now = performance.now();
      const dt = Math.max(now - s.prevT, 1);
      const instVel =
        (Math.sqrt((mx - s.prevMX) ** 2 + (my - s.prevMY) ** 2) / dt) * 16;
      s.velMag = lerp(s.velMag, instVel, 0.35);
      s.prevMX = mx;
      s.prevMY = my;
      s.prevT = now;
      const dragRatio = Math.min(dist, MAX_DRAG) / MAX_DRAG;
      const velFactor = Math.min(s.velMag / 12, 1);
      s.targetSpeed = Math.round(Math.max(dragRatio, velFactor) * 100);
      if (dist > 4) s.dirAngle = Math.atan2(s.ky, s.kx);
      startAnim();
    },
    [startAnim]
  );

  const onDown = useCallback(
    (mx, my) => {
      const s = stateRef.current;
      s.dragging = true;
      s.prevMX = mx;
      s.prevMY = my;
      s.prevT = performance.now();
      s.velMag = 0;
      updateKnob(mx, my);
    },
    [updateKnob]
  );

  const onUp = useCallback(() => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.dragging = false;
    s.targetSpeed = 0;
    const sx = s.kx,
      sy = s.ky;
    let f = 0;
    const ret = () => {
      f++;
      const p = Math.min(f / 20, 1);
      const e = 1 - Math.pow(1 - p, 3);
      s.kx = sx * (1 - e);
      s.ky = sy * (1 - e);
      if (p < 1) requestAnimationFrame(ret);
      else {
        s.kx = 0;
        s.ky = 0;
      }
    };
    requestAnimationFrame(ret);
    startAnim();
  }, [startAnim]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e) => {
      e.preventDefault();
      onDown(e.clientX, e.clientY);
    };
    const handleMouseMove = (e) => {
      if (stateRef.current.dragging) updateKnob(e.clientX, e.clientY);
    };
    const handleTouchStart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      onDown(t.clientX, t.clientY);
    };
    const handleTouchMove = (e) => {
      if (stateRef.current.dragging) {
        const t = e.touches[0];
        updateKnob(t.clientX, t.clientY);
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);

    drawFrame();

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", onUp);
      if (stateRef.current.rafId) cancelAnimationFrame(stateRef.current.rafId);
    };
  }, [onDown, onUp, updateKnob, drawFrame]);

  const handleSend = () => {
    const payload = { azimuth_speed: azimuthSpeed, elevation_speed: elevationSpeed };
    setLastSent(payload);
    if (onSend) onSend(payload);
  };

  const handleReset = () => {
    const s = stateRef.current;
    if (s.rafId) cancelAnimationFrame(s.rafId);
    s.kx = 0;
    s.ky = 0;
    s.targetSpeed = 0;
    s.displaySpeed = 0;
    s.velMag = 0;
    s.animating = false;
    setAzimuthSpeed(0);
    setElevationSpeed(0);
    setSpeed(0);
    setLastSent(null);
    drawFrame();
  };

  return (
    <Card
      style={{ width: 380, borderRadius: 16 }}
      styles={{ body: { padding: "24px 24px 20px" } }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          style={{ cursor: "grab", touchAction: "none", display: "block" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
        <Card size="small" style={{ textAlign: "center", background: "#fafafa" }}>
          <Statistic title="Hız" value={speed} suffix="%" valueStyle={{ fontSize: 20 }} />
        </Card>
        <Card size="small" style={{ textAlign: "center", background: "#fafafa" }}>
          <Statistic
            title="azimuth_speed"
            value={azimuthSpeed}
            valueStyle={{ fontSize: 20, color: "#0F6E56" }}
          />
          <Text type="secondary" style={{ fontSize: 11 }}>-100 / +100</Text>
        </Card>
        <Card size="small" style={{ textAlign: "center", background: "#fafafa" }}>
          <Statistic
            title="elevation_speed"
            value={elevationSpeed}
            valueStyle={{ fontSize: 20, color: "#534AB7" }}
          />
          <Text type="secondary" style={{ fontSize: 11 }}>-100 / +100</Text>
        </Card>
      </div>

      <Space style={{ width: "100%", justifyContent: "center" }}>
        <Button type="primary" onClick={handleSend}>
          Gönder
        </Button>
        <Button onClick={handleReset}>Sıfırla</Button>
      </Space>

      {lastSent && (
        <div
          style={{
            marginTop: 12,
            padding: "8px 12px",
            background: "#f5f5f5",
            borderRadius: 8,
            fontFamily: "monospace",
            fontSize: 12,
            color: "#555",
            textAlign: "center",
          }}
        >
          gönderildi → {JSON.stringify(lastSent)}
        </div>
      )}
    </Card>
  );
}

// Kullanım örneği:
// <JoystickController onSend={(payload) => fetch('/api/control', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(payload)
//   // payload = { azimuth_speed: -45, elevation_speed: 72 }
// })} />
