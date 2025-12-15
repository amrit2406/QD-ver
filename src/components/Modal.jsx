// src/components/Modal.jsx

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {title && (
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
