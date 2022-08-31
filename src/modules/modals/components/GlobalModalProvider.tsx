import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { memo, useCallback, useEffect, useState } from "react";
import { GlobalModalContext } from "../hooks";
import { ModalProps, ModalType } from "../types";
import AssetInfoModal from "./AssetInfoModal";
import ConfirmationModal from "./ConfirmationModal";
import ModalError from "./ModalError";
import PanelRenameModal from "./PanelRenameModal";
import TransactionModal from "./TransactionModal";
import WalletModal from "./WalletModal";

interface ModalState {
  props?: Omit<ModalProps, "modalType">;
  type: ModalType;
  onClose?: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<ModalType, React.FC<any>> = {
  [ModalType.Transaction]: TransactionModal,
  [ModalType.Wallet]: WalletModal,
  [ModalType.Confirmation]: ConfirmationModal,
  [ModalType.PanelRename]: PanelRenameModal,
  [ModalType.AssetInfo]: AssetInfoModal,
};

const GlobalModalProvider: React.FC = memo(function GlobalModalProvider({
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
    ) => {
      const state = {
        type,
        props,
        onClose: _onClose,
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
    if (!modalState) return <></>;

    const { type, props } = modalState;
    const Component = components[type];
    if (!Component) return <></>;

    return <Component {...props} />;
  }, [modalState]);

  return (
    <GlobalModalContext.Provider
      value={{ isOpen, open, close, error, setError }}
    >
      <Modal isCentered size="xl" isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent borderRadius="12px">
          <ModalCloseButton />
          <ModalBody>
            <ModalError>{renderComponent()}</ModalError>
          </ModalBody>
        </ModalContent>
      </Modal>
      {children}
    </GlobalModalContext.Provider>
  );
});

export default GlobalModalProvider;
