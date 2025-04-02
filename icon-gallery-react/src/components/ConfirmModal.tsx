// src/components/ConfirmModal.tsx
interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded shadow-md text-sm w-[220px] text-center">
          <p>{message}</p>
          <div className="mt-3 flex justify-center gap-3">
            <button
              onClick={onConfirm}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-200 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  