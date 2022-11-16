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
    const terms = getIsTermAccepted();
    if (terms) {
      // Terms are accepted, open wallet modal directly
      open(ModalType.Wallet)
    } else {
      // Terms not accepted, open disclaimer modal and attach wallet open to it
      open(ModalType.Disclaimer, {
        onAccept: () => {
          open(ModalType.Wallet)
        }
      })
    }
  };
}
