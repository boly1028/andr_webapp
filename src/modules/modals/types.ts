import { IAdoType } from "@/lib/schema/types";
import type { Msg } from "@andromedaprotocol/andromeda.js";
import { StdFee } from "@cosmjs/amino";
import { Coin } from "@cosmjs/proto-signing";
import { MsgInstantiateContractEncodeObject, MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate"
import { EmbeddableModalProps } from "./components/Embeddable/types";

export enum ModalType {
  Transaction = "transaction",
  Wallet = "wallet",
  Confirmation = "confirmation",
  PanelRename = "panelrename",
  AssetInfo = "assetinfo",
  Disclaimer = "disclaimer",
  MultiTransaction = "multitransaction",
  Embeddable = "embeddable"
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
) & { msg: Msg; modalType: ModalType.Transaction; fee?: StdFee | "auto", memo?: string, funds: Coin[]; };

export interface MultiTransactionModalProps {
  modalType: ModalType.MultiTransaction;
  msgs: (MsgInstantiateContractEncodeObject | MsgExecuteContractEncodeObject)[];
  fee?: StdFee;
  memo?: string;
}

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
  | MultiTransactionModalProps
  | EmbeddableModalProps
