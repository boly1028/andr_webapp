import { useCallback } from "react";
import { DisclaimerModalProps, ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

export default function useDisclaimerModal() {
  const { open } = useGlobalModalContext();

  return useCallback((data: Omit<DisclaimerModalProps, 'modalType'>) =>
    open(ModalType.Disclaimer, data, undefined, {
      title: 'DISCLAIMER'
    }), [open]);
}
