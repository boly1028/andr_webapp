import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/proto-signing";

export enum ModalType {
  Transaction = "transaction",
}

export interface ExecuteTransactionModalProps {
  msg: Msg;
  contractAddress: string;
  funds: Coin[];
  type: "execute";
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

export type ModalProps = TransactionModalProps;
