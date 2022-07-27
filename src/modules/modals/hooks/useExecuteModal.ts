import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";
import { ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the message modal for an execute message
 * @param contractAddress
 * @param msg
 * @param funds
 * @returns
 */
export default function useExecuteModal(
  contractAddress: string,
  msg: Msg,
  funds: Coin[] = [],
) {
  const { open } = useGlobalModalContext();

  return () =>
    open(ModalType.Message, { type: "execute", msg, funds, contractAddress });
}
