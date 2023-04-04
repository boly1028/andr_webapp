import { IAdoType } from "@/lib/schema/types";
import { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { StdFee } from "@cosmjs/amino";
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
  type: "execute";
}

export interface InstantiateTransactionModalProps {
  codeId: number;
  type: "instantiate";
}

export type TransactionModalProps = (
  | ExecuteTransactionModalProps
  | InstantiateTransactionModalProps
) & { msg: Msg; modalType: ModalType.Transaction; fee?: StdFee, memo?: string, funds: Coin[]; };

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
  match?: RegExp;
  preventSameSubmission?: boolean;
}

export interface AssetInfoModalProps {
  modalType: ModalType.AssetInfo;
  address: string;
  adoType: IAdoType;
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
