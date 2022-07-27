import { Msg } from "@andromedaprotocol/andromeda.js";
import { ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the message modal for an instantiate message
 * @param codeId
 * @returns
 */
export default function useInstantiateModal(codeId: number) {
  const { open } = useGlobalModalContext();

  return (msg: Msg) =>
    open(ModalType.Message, { type: "instantiate", codeId, msg });
}
