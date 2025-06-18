// components/common/Modal.tsx
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className={`bg-white dark:bg-[#2a2a40] rounded-lg p-6 w-full ${maxWidth} mx-4 shadow-lg overflow-y-auto max-h-[90vh]`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#4a4e69] dark:text-white">
            {title || ""}
          </h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-500 hover:text-red-500">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
