import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

type Listener = (toast: ToastItem) => void;
const listeners: Listener[] = [];

export const toast = {
  success: (msg: string) => dispatch('success', msg),
  error: (msg: string) => dispatch('error', msg),
  warning: (msg: string) => dispatch('warning', msg),
  info: (msg: string) => dispatch('info', msg),
};

function dispatch(type: ToastType, message: string) {
  const item: ToastItem = {
    id: Math.random().toString(36).substring(2, 9),
    type,
    message,
  };
  listeners.forEach((l) => l(item));
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler: Listener = (item) => {
      setToasts((prev) => [...prev, item]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== item.id));
      }, 3200);
    };

    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium backdrop-blur-md transition-all duration-300 pointer-events-auto ${
            t.type === 'success'
              ? 'bg-zinc-900/95 border-emerald-500/40 text-emerald-400'
              : t.type === 'error'
              ? 'bg-zinc-900/95 border-rose-500/40 text-rose-400'
              : t.type === 'warning'
              ? 'bg-zinc-900/95 border-amber-500/40 text-amber-400'
              : 'bg-zinc-900/95 border-blue-500/40 text-sky-400'
          }`}
        >
          {t.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
          {t.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0" />}
          {t.type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0" />}
          {t.type === 'info' && <Info className="w-4 h-4 shrink-0" />}
          <span className="text-zinc-100 text-xs sm:text-sm">{t.message}</span>
        </div>
      ))}
    </div>
  );
};
