import { getIsTermAccepted } from "../components/DisclaimerModal/utils";
import { ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the wallet modal
 * @returns
 */
export default function useWalletModal() {
  const { open } = useGlobalModalContext();

  return () => {
    open(ModalType.Disclaimer, {
      onAccept: () => {
        open(ModalType.Wallet)
      }
    })
  };
}
