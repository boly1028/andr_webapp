import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";

export enum ModalType {
  Transaction = "transaction",
  Wallet = "wallet",
}

export interface ExecuteTransactionModalProps {
  msg: Msg;
  contractAddress: string;
  funds: Coin[];
  type: "execute";
  memo?: string;
}

export interface InstantiateTransactionModalProps {
  codeId: number;
  msg: Msg;
  type: "instantiate";
}

export type TransactionModalProps = (
  | ExecuteTransactionModalProps
  | InstantiateTransactionModalProps
) & { simulate: boolean };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WalletModalProps {}

export type ModalProps = TransactionModalProps | WalletModalProps;
