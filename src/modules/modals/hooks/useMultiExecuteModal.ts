import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";
import { ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";
import { useAndromedaContext } from "@/lib/andrjs";
import type {
  MsgExecuteContractEncodeObject
} from "@cosmjs/cosmwasm-stargate";
/**
 * Wrapper hook for opening the message modal for an execute message.
 *  ```
 *  // Example Usage
 *  const open = useExecuteModal("somecontractaddress")
 *
 *  await open(msg, false, [...some coins])
 *
 *  ```
 * @param contractAddress
 * @returns
 */
export default function useMultiExecuteModal(contractAddress: string) {
  const { open } = useGlobalModalContext();
  const { client } = useAndromedaContext()

  return (msgs: Msg[], funds: Coin[] = []) => {
    const encodedMsgs: MsgExecuteContractEncodeObject[] = [];
    msgs.forEach(msg => {
      const encoded = client.chainClient?.encodeExecuteMsg(
        contractAddress, msg, funds
      )
      if (encoded)
        encodedMsgs.push(encoded);
    })
    open(ModalType.MultiTransaction, {
      msgs: encodedMsgs,
    });
  }
}
