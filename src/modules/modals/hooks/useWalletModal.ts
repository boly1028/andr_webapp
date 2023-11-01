import { useGlobalModalContext } from ".";
import { ModalType } from "../types";
import useDisclaimerModal from "./useDisclaimerModal";

/**
 * Wrapper hook for opening the wallet modal
 * @returns
 */
export default function useWalletModal() {
  const { open } = useGlobalModalContext()
  const openDisclaimer = useDisclaimerModal()
  return () => {
    openDisclaimer({
      onAccept: () => open(ModalType.Wallet, undefined, undefined, {
        size: 'md',
        hideClose: true
      })
    })
  };
}
