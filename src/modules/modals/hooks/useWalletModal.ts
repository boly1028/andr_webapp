import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";
import { ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the wallet modal
 * @returns
 */
export default function useWalletModal() {
  const { open } = useGlobalModalContext();

  return () => open(ModalType.Wallet);
}
