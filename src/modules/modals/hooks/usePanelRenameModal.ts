import { useCallback } from "react";
import { ConfirmationModalProps, ModalType, PanelRenameModalProps } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the Panel Rename Modal.
 */
export default function usePanelRenameModal() {
  const { open } = useGlobalModalContext();

  return useCallback((props: Omit<PanelRenameModalProps, 'modalType'>) =>
    open(ModalType.PanelRename, props), [open]);
}
