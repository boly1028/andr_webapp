import { createContext, useContext } from "react";
import { ModalProps, ModalType } from "../types";

export interface GlobalModalContextProps {
  isOpen: boolean;
  open: (
    type: ModalType,
    props: ModalProps,
    onClose?: () => Promise<void>,
  ) => void;
  close: () => void;
}

const defaultContext: GlobalModalContextProps = {
  isOpen: false,
  open: () => ({}),
  close: () => ({}),
};

export const GlobalModalContext =
  createContext<GlobalModalContextProps>(defaultContext);

export default function useGlobalModalContext() {
  return useContext(GlobalModalContext);
}
