import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { LiaTimesSolid } from "react-icons/lia";

interface PropsType {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: PropsType) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed w-full h-screen top-0 left-0 bg-black/30 backdrop-blur-[1px]">
      <div className="w-200 h-auto bg-white fixed z-10 top-1/2 p-8 left-1/2 -translate-1/2 rounded-2xl shadow-md flex flex-col gap-5">
        {children}
        <div className="absolute right-5 top-5">
          <button
            onClick={onClose}
            className="text-3xl text-gray-600 cursor-pointer"
          >
            <LiaTimesSolid />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ModalHeader({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

function ModalBody({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-6">{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;

export default Modal;
