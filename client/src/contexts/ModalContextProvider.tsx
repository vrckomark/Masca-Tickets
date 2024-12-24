import { createContext, useEffect, useState } from "react";

interface ModalContextProps {
  Modal: React.ReactNode | null;
  openModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
  type: string | null;
}

export const ModalContext = createContext({
  Modal: null,
  openModal: () => {},
  closeModal: () => {},
  type: null,
} as ModalContextProps);

interface ModalContextProviderProps {
  children: React.ReactNode;
}

const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  children,
}) => {
  const [Modal, setModal] = useState<null | React.ReactNode>(null);
  const [modalType, setModalType] = useState<string | null>(null);

  const openModal = (modal: React.ReactNode, type?: string) => {
    setModal(modal);
    if (type) setModalType(type);
  };

  const closeModal = () => {
    setModal(null);
  };

  useEffect(() => {
    if (Modal) return document.body.classList.add("no-scroll");
    else return document.body.classList.remove("no-scroll");
  }, [Modal]);

  return (
    <ModalContext.Provider
      value={{ Modal, openModal, type: modalType, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
