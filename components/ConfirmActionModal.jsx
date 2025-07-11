"use client";

import { FiX } from "react-icons/fi";
import { ImSpinner10 } from "react-icons/im";

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white border border-gray-700 p-6 rounded-lg w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#111] hover:text-white">
          <FiX className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold mb-2 text-[#111]">{title}</h3>
        <p className="text-sm text-[#111] mb-6">{message}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm">
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 flex items-center justify-center gap-2 hover:bg-red-700 px-4 py-2 rounded text-white text-sm">
            {confirmText}{" "}
            {loading && (
              <span className="animate-spin">
                <ImSpinner10 />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
