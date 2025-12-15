// src/components/CartFloating.jsx

export default function CartFloating({ count, onProceed }) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onProceed}
        className="flex items-center gap-3 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        <span className="bg-white text-blue-600 font-bold rounded-full w-7 h-7 flex items-center justify-center">
          {count}
        </span>
        <span className="font-medium">Proceed</span>
      </button>
    </div>
  );
}
