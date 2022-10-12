import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";

export enum ModalType {
  Transaction = "transaction",
  Wallet = "wallet",
  Confirmation = "confirmation",
  PanelRename = "panelrename",
  AssetInfo = "assetinfo",
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

export interface AddFundsModalProps {
  funds: Coin[];
  updateFunds: (funds: Coin[]) => void;
}

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
export interface PanelRenameModalProps {
  callback: (newName: string) => Promise<any> | any;
  title?: string;
  body?: string;
  acceptButtonText?: string;
  modalType: ModalType.PanelRename;
  reservedNames: string[];
  defaultName: string;
}

export interface AssetInfoModalProps {
  modalType: ModalType.AssetInfo;
  address: string;
}

export type ModalProps =
  | TransactionModalProps
  | WalletModalProps
  | ConfirmationModalProps
  | PanelRenameModalProps
  | AssetInfoModalProps;
