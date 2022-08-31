import { useCallback } from "react";
import { ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the asset info modal.
 */
export default function useAssetInfoModal() {
  const { open } = useGlobalModalContext();

  return useCallback((address: string) =>
    open(ModalType.AssetInfo, {
      address
    }), [open]);
}
