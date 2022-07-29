import { ConfirmationModalProps, ModalType } from "../types";
import useGlobalModalContext from "./useGlobalModalContext";

/**
 * Wrapper hook for opening the message modal for an execute message.
 *  ```
 *  // Example Usage
 *  const open = useConfirmationModal("danger", "Burn NFT", "Are you sure you want to burn this NFT? This action is irreversable.", "Burn")
 *
 *  open(burn)
 *
 *  ```
 * @param type "danger" or "warning"
 * @param title
 * @param body
 * @param acceptButtonText
 * @returns
 */
export default function useConfirmationModal(
  type: ConfirmationModalProps["type"] = "danger",
  title?: string,
  body?: string,
  acceptButtonText?: string,
) {
  const { open } = useGlobalModalContext();

  return (callback: () => Promise<void> | void) =>
    open(ModalType.Confirmation, {
      callback,
      type,
      title,
      body,
      acceptButtonText,
    });
}
