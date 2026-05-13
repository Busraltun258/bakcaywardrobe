import { useEffect, useRef, useState, useCallback } from "react";

/**
 * JoystickController
 *
 * Props:
 *   dataChannel: RTCDataChannel — açık bir WebRTC data channel
 *   sendHz: number             — saniyede kaç kez gönderilsin (default 20)
 *
 * Gönderilen mesaj: JSON string
 *   { azimuth_speed: -100..100, elevation_speed: -100..100 }
 *
 * azimuth_speed  : sol = -100, sağ = +100
 * elevation_speed: aşağı = -100, yukarı = +100
 */

const SIZE = 300;
const CX = 150;
const CY = 150;
const OUTER_R = 130;
const INNER_R = 108;
const KNOB_R = 20;
const MAX_DRAG = 88;

// Easing katsayıları
const RETURN_FRAMES = 28;   // bırakınca kaç frame'de merkeze dönsün
const SPEED_EASE = 0.14;    // displaySpeed lerp hızı

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// ─── Renk paleti ─────────────────────────────────────────────────────────────
const DARK = {
  bg:         "rgba(18,17,30,0.97)",
  outerRing:  "rgba(160,155,210,0.18)",
  innerRing:  "rgba(160,155,210,0.10)",
  tickMaj:    "rgba(200,196,240,0.85)",
  tickMid:    "rgba(200,196,240,0.45)",
  tickMin:    "rgba(200,196,240,0.20)",
  arc:        "rgba(100,210,180,0.30)",
  arcEdge:    "rgba(100,210,180,0.80)",
  arrow:      "#5DCAA5",
  crosshair:  "rgba(200,196,240,0.07)",
  center:     "rgba(200,196,240,0.45)",
  knobFill:   "rgba(28,26,48,0.97)",
  knobStroke: "rgba(160,155,210,0.50)",
  knobDot:    "rgba(160,155,210,0.75)",
  label:      "#5DCAA5",
  text:       "#c8c4f0",
  dimText:    "rgba(200,196,240,0.40)",
  cardBg:     "rgba(28,26,48,1)",
  statBg:     "rgba(40,38,62,0.9)",
  borderCol:  "rgba(160,155,210,0.15)",
  azCol:      "#5DCAA5",
  elCol:      "#AFA9EC",
  btnPrimary: "rgba(93,202,165,0.18)",
  btnBorder:  "rgba(93,202,165,0.55)",
  btnText:    "#5DCAA5",
  btnReset:   "rgba(160,155,210,0.12)",
  btnResetB:  "rgba(160,155,210,0.35)",
  btnResetT:  "rgba(200,196,240,0.7)",
};

const LIGHT = {
  bg:         "rgba(248,247,255,0.98)",
  outerRing:  "rgba(60,55,120,0.14)",
  innerRing:  "rgba(60,55,120,0.08)",
  tickMaj:    "rgba(50,45,100,0.80)",
  tickMid:    "rgba(50,45,100,0.40)",
  tickMin:    "rgba(50,45,100,0.18)",
  arc:        "rgba(15,110,86,0.18)",
  arcEdge:    "rgba(15,110,86,0.75)",
  arrow:      "#0A6E56",
  crosshair:  "rgba(60,55,120,0.06)",
  center:     "rgba(60,55,120,0.35)",
  knobFill:   "rgba(250,250,255,0.98)",
  knobStroke: "rgba(83,74,183,0.40)",
  knobDot:    "rgba(83,74,183,0.65)",
  label:      "#0A6E56",
  text:       "#2a2550",
  dimText:    "rgba(60,55,120,0.40)",
  cardBg:     "#ffffff",
  statBg:     "rgba(245,244,255,0.9)",
  borderCol:  "rgba(83,74,183,0.12)",
  azCol:      "#0A6E56",
  elCol:      "#534AB7",
  btnPrimary: "rgba(10,110,86,0.10)",
  btnBorder:  "rgba(10,110,86,0.50)",
  btnText:    "#0A6E56",
  btnReset:   "rgba(83,74,183,0.08)",
  btnResetB:  "rgba(83,74,183,0.30)",
  btnResetT:  "rgba(83,74,183,0.75)",
};

function getPalette() {
  try {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-background-primary").trim();
    if (v) {
      const hex = v.replace("#", "");
      if (parseInt(hex.slice(0, 2) || "ff", 16) < 128) return DARK;
    }
  } catch (_) {}
  return LIGHT;
}

// ─── drawArrow ────────────────────────────────────────────────────────────────
function drawArrow(ctx, fx, fy, angle, len, color, lw, hs) {
  const ex = fx + Math.cos(angle) * len;
  const ey = fy + Math.sin(angle) * len;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;
  ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(ex, ey); ctx.stroke();
  const bx = ex - Math.cos(angle) * hs * 1.5;
  const by = ey - Math.sin(angle) * hs * 1.5;
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.lineTo(bx - Math.sin(angle) * hs, by + Math.cos(angle) * hs);
  ctx.lineTo(bx + Math.sin(angle) * hs, by - Math.cos(angle) * hs);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

// ─── Bileşen ──────────────────────────────────────────────────────────────────
export default function JoystickController({ dataChannel, sendHz = 20 }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({
    dragging: false,
    kx: 0, ky: 0,              // gerçek knob pozisyonu (piksel, merkez = 0,0)
    targetKx: 0, targetKy: 0,  // dönüş hedefi
    returnFrame: 0,
    returnSx: 0, returnSy: 0,
    returning: false,
    displaySpeed: 0,
    dirAngle: -Math.PI / 2,
    rafId: null,
    lastSendT: 0,
    // Hız ölçümü
    prevMX: 0, prevMY: 0, prevT: 0,
    velX: 0, velY: 0,          // piksel/ms — smooth edilmiş
  });

  const [azimuth,   setAzimuth]   = useState(0);
  const [elevation, setElevation] = useState(0);
  const [sendCount, setSendCount] = useState(0);
  const [dcState,   setDcState]   = useState("—");

  // DataChannel durum takibi
  useEffect(() => {
    if (!dataChannel) { setDcState("—"); return; }
    const update = () => setDcState(dataChannel.readyState ?? "—");
    update();
    dataChannel.addEventListener("open",    update);
    dataChannel.addEventListener("close",   update);
    dataChannel.addEventListener("error",   update);
    return () => {
      dataChannel.removeEventListener("open",  update);
      dataChannel.removeEventListener("close", update);
      dataChannel.removeEventListener("error", update);
    };
  }, [dataChannel]);

  // ─── Canvas çizimi ─────────────────────────────────────────────────────────
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s   = stateRef.current;
    const p   = getPalette();
    const dist = Math.sqrt(s.kx * s.kx + s.ky * s.ky);

    ctx.clearRect(0, 0, SIZE, SIZE);

    // Arka plan daire
    ctx.beginPath();
    ctx.arc(CX, CY, OUTER_R + 2, 0, Math.PI * 2);
    ctx.fillStyle = p.bg;
    ctx.fill();

    // Dış halka
    ctx.beginPath();
    ctx.arc(CX, CY, OUTER_R, 0, Math.PI * 2);
    ctx.strokeStyle = p.outerRing;
    ctx.lineWidth = 1;
    ctx.stroke();

    // İç halka
    ctx.beginPath();
    ctx.arc(CX, CY, INNER_R, 0, Math.PI * 2);
    ctx.strokeStyle = p.innerRing;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Ticks
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
      const isMaj = i % 10 === 0;
      const isMid = i % 5 === 0 && !isMaj;
      const r1 = isMaj ? INNER_R + 4 : isMid ? INNER_R + 3 : INNER_R + 2;
      const r2 = OUTER_R - (isMaj ? 1 : isMid ? 3 : 5);
      ctx.save();
      ctx.strokeStyle = isMaj ? p.tickMaj : isMid ? p.tickMid : p.tickMin;
      ctx.lineWidth   = isMaj ? 1.6 : isMid ? 1.1 : 0.7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(CX + Math.cos(a) * r1, CY + Math.sin(a) * r1);
      ctx.lineTo(CX + Math.cos(a) * r2, CY + Math.sin(a) * r2);
      ctx.stroke();
      ctx.restore();
    }

    // Hız arki (kamera ne kadar hızlı = toplam dist'e göre)
    const speedRatio = clamp(dist / MAX_DRAG, 0, 1);
    s.displaySpeed = lerp(s.displaySpeed, speedRatio * 100, SPEED_EASE);
    if (Math.abs(s.displaySpeed - speedRatio * 100) < 0.2)
      s.displaySpeed = speedRatio * 100;

    if (s.displaySpeed > 0.5) {
      const arcEnd = -Math.PI / 2 + (s.displaySpeed / 100) * Math.PI * 2;
      const midR   = (INNER_R + OUTER_R) / 2;
      const arcW   = OUTER_R - INNER_R - 2;
      ctx.beginPath();
      ctx.arc(CX, CY, midR, -Math.PI / 2, arcEnd);
      ctx.strokeStyle = p.arc;
      ctx.lineWidth   = arcW;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(CX, CY, OUTER_R - 1, -Math.PI / 2, arcEnd);
      ctx.strokeStyle = p.arcEdge;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    }

    // Crosshair
    ctx.save();
    ctx.strokeStyle = p.crosshair;
    ctx.lineWidth   = 1;
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.moveTo(CX, CY - INNER_R + 2); ctx.lineTo(CX, CY + INNER_R - 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(CX - INNER_R + 2, CY); ctx.lineTo(CX + INNER_R - 2, CY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Yön oku — tek ok, her zaman görünür, hız × uzunluk
    const arrowLen  = 26 + speedRatio * 58;
    const arrowAlpha = 0.30 + speedRatio * 0.70;
    ctx.save();
    ctx.globalAlpha = arrowAlpha;
    drawArrow(ctx, CX, CY, s.dirAngle, arrowLen, p.arrow, 2.8, 7);
    ctx.restore();

    // Duran label (sürüklenince solar)
    const labelAlpha = clamp(1 - (dist / MAX_DRAG) * 2.2, 0, 1);
    if (labelAlpha > 0.02) {
      ctx.save();
      ctx.globalAlpha = labelAlpha;
      ctx.font = "10px monospace";
      ctx.fillStyle   = p.dimText;
      ctx.textAlign   = "center";
      ctx.fillText("sürükle", CX, CY + 26);
      ctx.restore();
    }

    // Merkez nokta
    ctx.beginPath();
    ctx.arc(CX, CY, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = p.center;
    ctx.fill();

    // Knob (MAX_DRAG içinde sınırlandırılmış)
    const ka   = Math.atan2(s.ky, s.kx);
    const kDist = Math.min(dist, MAX_DRAG);
    const kkx  = CX + Math.cos(ka) * kDist;
    const kky  = CY + Math.sin(ka) * kDist;

    // Knob gölgesi
    ctx.save();
    ctx.shadowColor   = "rgba(0,0,0,0.25)";
    ctx.shadowBlur    = 10;
    ctx.shadowOffsetY = 3;
    ctx.beginPath();
    ctx.arc(kkx, kky, KNOB_R, 0, Math.PI * 2);
    ctx.fillStyle   = p.knobFill;
    ctx.strokeStyle = p.knobStroke;
    ctx.lineWidth   = 1.5;
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Knob merkez nokta
    ctx.beginPath();
    ctx.arc(kkx, kky, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = p.knobDot;
    ctx.fill();
  }, []);

  // ─── Gönderme loop'u (rAF içinde throttle) ─────────────────────────────────
  const rafLoop = useCallback(() => {
    const s = stateRef.current;

    // Easing ile dönüş
    if (s.returning) {
      s.returnFrame++;
      const p  = Math.min(s.returnFrame / RETURN_FRAMES, 1);
      const ep = 1 - Math.pow(1 - p, 3);       // ease-out cubic
      s.kx = s.returnSx * (1 - ep);
      s.ky = s.returnSy * (1 - ep);
      if (p >= 1) {
        s.kx = 0; s.ky = 0;
        s.returning = false;
        s.dirAngle  = -Math.PI / 2;
      }
    }

    drawFrame();

    // React state güncelle
    // Pozisyon tabanlı: knob ne kadar uzakta → o kadar hızlı
    // Knob sağda dururken kamera sağa dönmeye devam eder, bırakınca durur
    const dist = Math.sqrt(s.kx * s.kx + s.ky * s.ky);
    const az = dist < 3 ? 0 : Math.round((s.kx / MAX_DRAG) * 100);
    const el = dist < 3 ? 0 : Math.round((-s.ky / MAX_DRAG) * 100);
    setAzimuth(az);
    setElevation(el);

    // DataChannel'a throttle'lı gönder
    const now = performance.now();
    const minInterval = 1000 / sendHz;
    if (dataChannel?.readyState === "open" && now - s.lastSendT >= minInterval) {
      s.lastSendT = now;
      try {
        dataChannel.send(JSON.stringify({
          azimuth_speed:   az,
          elevation_speed: el,
        }));
        setSendCount(c => c + 1);
      } catch (_) {}
    }

    if (s.dragging || s.returning || s.displaySpeed > 0.3) {
      s.rafId = requestAnimationFrame(rafLoop);
    } else {
      s.rafId = null;
    }
  }, [drawFrame, dataChannel, sendHz]);

  const ensureLoop = useCallback(() => {
    const s = stateRef.current;
    if (!s.rafId) s.rafId = requestAnimationFrame(rafLoop);
  }, [rafLoop]);

  // ─── Pointer handlers ──────────────────────────────────────────────────────
  const onDown = useCallback((mx, my) => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    s.dragging  = true;
    s.returning = false;
    s.velX = 0; s.velY = 0;
    s.prevMX = mx; s.prevMY = my; s.prevT = performance.now();
    s.kx = mx - rect.left - CX;
    s.ky = my - rect.top  - CY;
    const dist = Math.sqrt(s.kx * s.kx + s.ky * s.ky);
    if (dist > MAX_DRAG) { s.kx = (s.kx / dist) * MAX_DRAG; s.ky = (s.ky / dist) * MAX_DRAG; }
    if (dist > 4) s.dirAngle = Math.atan2(s.ky, s.kx);
    ensureLoop();
  }, [ensureLoop]);

  const onMove = useCallback((mx, my) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    let nx = mx - rect.left - CX;
    let ny = my - rect.top  - CY;
    const dist = Math.sqrt(nx * nx + ny * ny);
    if (dist > MAX_DRAG) { nx = (nx / dist) * MAX_DRAG; ny = (ny / dist) * MAX_DRAG; }
    s.kx = nx; s.ky = ny;
    if (dist > 4) s.dirAngle = Math.atan2(ny, nx);

    // Pointer hızını ölç (piksel/ms), exponential smooth
    const now = performance.now();
    const dt  = Math.max(now - s.prevT, 1);
    const ivx = (mx - s.prevMX) / dt;
    const ivy = (my - s.prevMY) / dt;
    const ALPHA = 0.7; // ne kadar smooth (0=çok smooth, 1=anlık)
    s.velX = lerp(s.velX, ivx, ALPHA);
    s.velY = lerp(s.velY, ivy, ALPHA);
    s.prevMX = mx; s.prevMY = my; s.prevT = now;
  }, []);

  const onUp = useCallback(() => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.dragging     = false;
    s.velX = 0; s.velY = 0;
    s.returning    = true;
    s.returnFrame  = 0;
    s.returnSx     = s.kx;
    s.returnSy     = s.ky;
    ensureLoop();
  }, [ensureLoop]);

  // ─── Event listeners ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const md = (e) => { e.preventDefault(); onDown(e.clientX, e.clientY); };
    const mm = (e) => { onMove(e.clientX, e.clientY); };
    const ts = (e) => { e.preventDefault(); onDown(e.touches[0].clientX, e.touches[0].clientY); };
    const tm = (e) => { onMove(e.touches[0].clientX, e.touches[0].clientY); };

    canvas.addEventListener("mousedown",  md);
    window.addEventListener("mousemove",  mm);
    window.addEventListener("mouseup",    onUp);
    canvas.addEventListener("touchstart", ts, { passive: false });
    window.addEventListener("touchmove",  tm, { passive: true });
    window.addEventListener("touchend",   onUp);

    drawFrame();

    return () => {
      canvas.removeEventListener("mousedown",  md);
      window.removeEventListener("mousemove",  mm);
      window.removeEventListener("mouseup",    onUp);
      canvas.removeEventListener("touchstart", ts);
      window.removeEventListener("touchmove",  tm);
      window.removeEventListener("touchend",   onUp);
      const s = stateRef.current;
      if (s.rafId) cancelAnimationFrame(s.rafId);
    };
  }, [onDown, onMove, onUp, drawFrame]);

  // ─── Sıfırla ───────────────────────────────────────────────────────────────
  const handleReset = () => {
    const s = stateRef.current;
    if (s.rafId) cancelAnimationFrame(s.rafId);
    Object.assign(s, {
      dragging: false, kx: 0, ky: 0,
      targetKx: 0, targetKy: 0,
      returning: false, returnFrame: 0,
      displaySpeed: 0,
      dirAngle: -Math.PI / 2,
      rafId: null,
    });
    setAzimuth(0); setElevation(0);
    drawFrame();
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  const az  = azimuth;
  const el  = elevation;

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
      width: 360,
      background: "var(--color-background-primary, #fff)",
      border: "1px solid rgba(120,115,180,0.15)",
      borderRadius: 18,
      overflow: "hidden",
      boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
    }}>
      {/* Header */}
      <div style={{
        padding: "12px 20px 10px",
        borderBottom: "1px solid rgba(120,115,180,0.10)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 11, letterSpacing: "0.12em", opacity: 0.55 }}>
          KAMERA KONTROLÜ
        </span>
        <span style={{
          fontSize: 10, letterSpacing: "0.08em",
          padding: "2px 8px", borderRadius: 4,
          background: dcState === "open"
            ? "rgba(93,202,165,0.15)" : "rgba(200,80,80,0.12)",
          color: dcState === "open" ? "#5DCAA5" : "#e08080",
          border: `1px solid ${dcState === "open" ? "rgba(93,202,165,0.4)" : "rgba(200,80,80,0.3)"}`,
        }}>
          {dcState === "open" ? "● BAĞLI" : dcState === "—" ? "— DC YOK" : `● ${dcState.toUpperCase()}`}
        </span>
      </div>

      {/* Canvas */}
      <div style={{ display: "flex", justifyContent: "center", padding: "18px 0 8px" }}>
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          style={{ cursor: "crosshair", touchAction: "none", display: "block" }}
        />
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "0 18px 16px" }}>
        {[
          { label: "azimuth_speed",   value: az,  unit: "←→" },
          { label: "elevation_speed", value: el,  unit: "↑↓" },
        ].map(({ label, value, unit }) => (
          <div key={label} style={{
            background: "rgba(120,115,180,0.06)",
            border: "1px solid rgba(120,115,180,0.12)",
            borderRadius: 10, padding: "8px 10px", textAlign: "center",
          }}>
            <div style={{ fontSize: 9, letterSpacing: "0.1em", opacity: 0.45, marginBottom: 3 }}>
              {label.toUpperCase()} {unit}
            </div>
            <div style={{
              fontSize: 22, fontWeight: 600, lineHeight: 1,
              color: label === "azimuth_speed"   ? "#5DCAA5" : "#AFA9EC",
            }}>
              {value > 0 ? `+${value}` : value}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: "10px 18px 14px",
        borderTop: "1px solid rgba(120,115,180,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 10, opacity: 0.35 }}>
          {sendHz}Hz · gönderildi: {sendCount}
        </span>
        <button
          onClick={handleReset}
          style={{
            fontSize: 11, letterSpacing: "0.08em",
            padding: "4px 14px", borderRadius: 6, cursor: "pointer",
            background: "transparent",
            border: "1px solid rgba(120,115,180,0.30)",
            color: "inherit", opacity: 0.65,
          }}
        >
          SIFIRLA
        </button>
      </div>
    </div>
  );
}

/**
 * ─── Kullanım ─────────────────────────────────────────────────────────────────
 *
 * // WebRTC bağlantısı kurulduktan sonra dataChannel'ı ver:
 *
 * const pc = new RTCPeerConnection(config);
 * const dc = pc.createDataChannel("camera");
 *
 * <JoystickController dataChannel={dc} sendHz={20} />
 *
 * // Alıcı tarafta:
 * dc.onmessage = (e) => {
 *   const { azimuth_speed, elevation_speed } = JSON.parse(e.data);
 *   // azimuth_speed:   -100 (sol) .. +100 (sağ)
 *   // elevation_speed: -100 (aşağı) .. +100 (yukarı)
 * };
 * ─────────────────────────────────────────────────────────────────────────────
 */
