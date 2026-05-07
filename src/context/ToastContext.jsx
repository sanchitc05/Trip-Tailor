import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const pushToast = (message, type = "info") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const value = useMemo(() => ({ pushToast }), []);

  useEffect(() => {
    const handler = (event) => {
      const message = event.detail?.message || "Request failed.";
      pushToast(message, "error");
    };
    window.addEventListener("app-error", handler);
    return () => window.removeEventListener("app-error", handler);
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[999] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl border px-4 py-2 text-sm shadow-lg ${
              t.type === "error"
                ? "border-rose-300/40 bg-rose-500/20 text-rose-100"
                : "border-white/20 bg-slate-900/90 text-slate-100"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
