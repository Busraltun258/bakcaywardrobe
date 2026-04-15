import React from "react";

export function useToast() {
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(t);
    }
  }, [message]);

  const Toast = message
    ? () => <div className="toast">{message}</div>
    : () => null;

  return { showToast: setMessage, Toast };
}
