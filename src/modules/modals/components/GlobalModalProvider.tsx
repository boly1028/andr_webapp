import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode, memo, useCallback, useEffect, useState } from "react";
import { GlobalModalContext } from "../hooks";
import { ModalProps, ModalType } from "../types";
import AssetInfoModal from "./AssetInfoModal";
import ConfirmationModal from "./ConfirmationModal";
import DisclaimerModal from "./DisclaimerModal";
import ModalError from "./ModalError";
import PanelRenameModal from "./PanelRenameModal";
import TransactionModal from "./TransactionModal";
import WalletModal from "./WalletModal";
import MultiTransactionModal from "./MultiTransaction";
import EmbeddableModal from "./Embeddable";

interface ModalState {
  props?: Omit<ModalProps, "modalType">;
  type: ModalType;
  onClose?: () => Promise<void>;
  children?: ReactNode;
  title?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<ModalType, React.FC<any>> = {
  [ModalType.Transaction]: TransactionModal,
  [ModalType.Wallet]: WalletModal,
  [ModalType.Confirmation]: ConfirmationModal,
  [ModalType.PanelRename]: PanelRenameModal,
  [ModalType.AssetInfo]: AssetInfoModal,
  [ModalType.Disclaimer]: DisclaimerModal,
  [ModalType.MultiTransaction]: MultiTransactionModal,
  [ModalType.Embeddable]: EmbeddableModal
};

const GlobalModalProvider: React.FC<{ children?: ReactNode }> = function GlobalModalProvider({
  children,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState<ModalState | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const open = useCallback(
    <T extends ModalProps>(
      type: T["modalType"],
      props?: Omit<T, "modalType">,
      _onClose?: () => Promise<void>,
      title?: string
    ) => {
      const state: ModalState = {
        type,
        props,
        onClose: _onClose,
        title: title
      };

      setModalState(state);
    },
    [],
  );
  const close = useCallback(() => {
    setModalState(undefined);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen && typeof modalState !== "undefined") {
      onOpen();
    } else if (isOpen && typeof modalState === "undefined") {
      onClose();
    }
    // Reset Local states on modal transitions
    setError(undefined);
  }, [modalState, isOpen, onOpen, onClose]);

  const renderComponent = useCallback(() => {
    if (!modalState) return null;

    const { type, props } = modalState;
    const Component = components[type];
    if (!Component) return null;

    return <Component {...props} />;
  }, [modalState]);

  return (
    <GlobalModalContext.Provider
      value={{ isOpen, open, close, error, setError }}
    >
      <Modal isCentered isOpen={isOpen} onClose={close} size="xl">
        <ModalOverlay />
        <ModalContent pb='4'>
          {modalState?.title && (
            <ModalHeader>
              {modalState.title}
            </ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody>
            <ModalError>{renderComponent()}</ModalError>
          </ModalBody>
        </ModalContent>
      </Modal>
      {children}
    </GlobalModalContext.Provider>
  );
};

export default React.memo(GlobalModalProvider);
