import { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";

export enum ModalType {
  Transaction = "transaction",
  Wallet = "wallet",
  Confirmation = "confirmation",
  PanelRename = "panelrename",
  AssetInfo = "assetinfo",
  Disclaimer = "disclaimer"
}

export interface ExecuteTransactionModalProps {
  contractAddress: string;
  funds: Coin[];
  type: "execute";
}

export interface InstantiateTransactionModalProps {
  codeId: number;
  type: "instantiate";
}

export type TransactionModalProps = (
  | ExecuteTransactionModalProps
  | InstantiateTransactionModalProps
) & { msg: Msg; modalType: ModalType.Transaction; fee?: Fee, memo?: string };

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

export interface DisclaimerModalProps {
  modalType: ModalType.Disclaimer;
  onAccept: () => void;
}

export type ModalProps =
  | TransactionModalProps
  | WalletModalProps
  | ConfirmationModalProps
  | PanelRenameModalProps
  | AssetInfoModalProps
  | DisclaimerModalProps
