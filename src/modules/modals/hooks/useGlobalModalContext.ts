import { createContext, useContext } from "react";
import type { ModalProps } from "../types";

export interface GlobalModalContextProps {
  isOpen: boolean;
  open: <T extends ModalProps>(
    type: T["modalType"],
    props?: Omit<T, "modalType">,
    onClose?: () => Promise<void>,
  ) => void;
  close: () => void;
  error?: Error;
  setError: (error?: Error) => void;
}

const defaultContext: GlobalModalContextProps = {
  isOpen: false,
  open: () => ({}),
  close: () => ({}),
  setError: () => ({}),
};

export const GlobalModalContext =
  createContext<GlobalModalContextProps>(defaultContext);

export default function useGlobalModalContext() {
  return useContext(GlobalModalContext);
}
