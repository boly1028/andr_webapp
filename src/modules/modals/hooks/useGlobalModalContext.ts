import { createContext, useContext } from "react";
import type { ModalProps } from "../types";

type ExtractModalParameters<A, T> = A extends { modalType: T } ? Omit<A, 'modalType'> : never
export interface GlobalModalContextProps {
  isOpen: boolean;
  open: <T extends ModalProps['modalType']>(
    type: T,
    props?: ExtractModalParameters<ModalProps, T>,
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
