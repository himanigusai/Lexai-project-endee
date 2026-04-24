const toneMap = {
  success: 'border-emerald-400/30 bg-emerald-500/15 text-emerald-50',
  error: 'border-rose-400/30 bg-rose-500/15 text-rose-50',
  info: 'border-sky-400/30 bg-sky-500/15 text-sky-50'
};

const ToastContainer = ({ toasts, onClose }) => (
  <div className="fixed right-4 top-4 z-50 space-y-3">
    {toasts.map((toast) => (
      <button
        key={toast.id}
        type="button"
        onClick={() => onClose(toast.id)}
        className={`glass-panel luxury-border block max-w-sm px-4 py-3 text-left text-sm ${toneMap[toast.type] || toneMap.info}`}
      >
        <p className="font-semibold">{toast.title}</p>
        <p className="mt-1 text-white/80">{toast.description}</p>
      </button>
    ))}
  </div>
);

export default ToastContainer;

