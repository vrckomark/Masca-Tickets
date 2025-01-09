import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { ModalContext } from "../../contexts/ModalContextProvider";

interface ModalProps {
  children: React.ReactNode;
  scrollRef?: React.RefObject<HTMLDivElement>;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, scrollRef, onClose }) => {
  const { closeModal } = useContext(ModalContext);

  const handleCloseModal = () => {
    if (onClose) onClose();
    closeModal();
  };

  return (
    <div
      ref={scrollRef}
      className={`bg-black pb-[33vh] pt-[10vh] fixed inset-0 bg-opacity-50 px-5 z-10 backdrop-blur-md overflow-y-auto`}
      onClick={handleCloseModal}
    >
      <div
        className="bg-background relative shadow-2xl rounded-xl px-5 py-6 mx-auto max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-2 z-20"
          onClick={closeModal}
        >
          <FaPlus className="rotate-45 text-secondary w-8 h-8" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
