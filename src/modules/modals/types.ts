import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";

export enum ModalType {
  Transaction = "transaction",
  Wallet = "wallet",
  Confirmation = "confirmation",
}

export interface ExecuteTransactionModalProps {
  contractAddress: string;
  funds: Coin[];
  type: "execute";
  memo?: string;
}

export interface InstantiateTransactionModalProps {
  codeId: number;
  type: "instantiate";
}

export type TransactionModalProps = (
  | ExecuteTransactionModalProps
  | InstantiateTransactionModalProps
) & { simulate: boolean; msg: Msg; modalType: ModalType.Transaction };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WalletModalProps {
  modalType: ModalType.Wallet;
}

export interface ConfirmationModalProps {
  callback: () => Promise<void> | void;
  title?: string;
  body?: string;
  type: "warning" | "danger";
  acceptButtonText?: string;
  modalType: ModalType.Confirmation;
}

export type ModalProps =
  | TransactionModalProps
  | WalletModalProps
  | ConfirmationModalProps;