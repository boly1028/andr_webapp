import { useCallback } from "react";
import { ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";
import { EmbeddableModalProps } from "../components/Embeddable/types";

export default function useEmbeddableModal() {
  const { open } = useGlobalModalContext();

  return useCallback((data: Omit<EmbeddableModalProps, 'modalType'>) =>
    open(ModalType.Embeddable, data), [open]);
}
