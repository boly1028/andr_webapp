/* eslint-disable @typescript-eslint/no-empty-function */
import type { OfflineSigner } from "@cosmjs/proto-signing";
import { Keplr } from "@keplr-wallet/types";
import { createContext, useContext } from "react";

export enum KeplrConnectionStatus {
  NotInstalled = "notinstalled",
  Connecting = "connecting",
  Ok = "ok",
}

export interface WalletContext {
  keplr?: Keplr;
  status: KeplrConnectionStatus;
  chainId: string;
  setChainId: (chainId: string) => void;
  signer?: OfflineSigner;
  //Requests the user's wallet info from Keplr
  connect: () => void;
  //Removes the user's wallet info from wallet context
  disconnect: () => void;
}

const defaultWalletContext: WalletContext = {
  status: KeplrConnectionStatus.Connecting,
  chainId: "",
  setChainId: () => {},
  connect: () => {},
  disconnect: () => {},
};

export const WalletContext = createContext(defaultWalletContext);

export default function useWalletContext(): WalletContext {
  return useContext(WalletContext);
}
