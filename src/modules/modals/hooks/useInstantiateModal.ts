import { Msg } from "@andromedaprotocol/andromeda.js";
import { ModalType, TransactionModalProps } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the message modal for an instantiate message
 *  ```
 *  // Example Usage
 *  const open = useInstantiateModal(101)
 *
 *  await open(msg)
 *
 *  ```
 * @param codeId
 * @returns
 */
export default function useInstantiateModal(codeId: number) {
  const { open } = useGlobalModalContext();

  return (msg: Msg, funds: TransactionModalProps['funds'] = []) =>
    open(ModalType.Transaction, { type: "instantiate", codeId, msg, memo: "Instantiate", funds });
}
