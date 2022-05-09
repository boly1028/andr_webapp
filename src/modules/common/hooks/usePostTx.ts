import { useCallback, useEffect, useReducer } from "react";
import { LCDClient, TxInfo } from "@terra-money/terra.js";
import { useQuery } from "react-query";

import { useAddress, estimateFee } from "@arthuryeti/terra";
import { useLCDClient, useWallet } from "@terra-money/wallet-provider";

enum ActionType {
  RESET = "RESET",
  POSTING = "POSTING",
  POST_ERROR = "POST_ERROR",
  BROADCASTING = "BROADCASTING",
  BROADCAST_ERROR = "BROADCAST_ERROR",
  BROADCAST_SUCCESS = "BROADCAST_SUCCESS",
}

type Action =
  | { type: "RESET" }
  | { type: "POSTING" }
  | { type: "POST_ERROR"; error: string }
  | { type: "BROADCASTING"; txHash: string }
  | { type: "BROADCAST_ERROR"; txHash: string; txInfo: TxInfo }
  | { type: "BROADCAST_SUCCESS"; txHash: string; txInfo: TxInfo };

interface State {
  step: string;
  txHash: string | undefined;
  txInfo: TxInfo | undefined;
  error: string | undefined;
}

const initialState = {
  step: "idle",
  txHash: undefined,
  txInfo: undefined,
  error: undefined,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.RESET:
      return {
        ...state,
        ...initialState,
      };
    case ActionType.POSTING:
      return {
        ...state,
        step: "posting",
      };
    case ActionType.POST_ERROR:
      return {
        ...state,
        step: "postError",
        error: action.error,
      };
    case ActionType.BROADCASTING:
      return {
        ...state,
        step: "broadcasting",
        txHash: action.txHash,
      };
    case ActionType.BROADCAST_ERROR:
      return {
        ...state,
        step: "broadcastError",
        txHash: action.txHash,
        txInfo: action.txInfo,
      };
    case ActionType.BROADCAST_SUCCESS:
      return {
        ...state,
        step: "broadcastSuccess",
        txHash: action.txHash,
        txInfo: action.txInfo,
      };
    default:
      return state;
  }
};

const txInfoFetcher = async (
  txHash: string,
  lcd: LCDClient,
): Promise<TxInfo> => {
  return lcd.tx.txInfo(txHash);
};

const TX_TIMEOUT_INTERVAL = 60 * 1000; // 1 min to listen for a transaction broadcast
const RETRY_COUNT = 60;

type PostParams = {
  msgs: any[];
};

export type PostTx = {
  state: State;
  canPost: boolean;

  // Posts the tx
  post(params: PostParams): Promise<void>;

  // Resets post state
  reset(): void;
};

export function usePostTx(): PostTx {
  const connectedWallet = useAddress();
  const { post: postTx } = useWallet();
  const lcdClient = useLCDClient();

  const [{ step, txInfo, txHash, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const { data: txInfoData } = useQuery(
    ["tx-info", txHash],
    () => txInfoFetcher(txHash ?? "", lcdClient),
    {
      enabled: Boolean(txHash),
      retryDelay: TX_TIMEOUT_INTERVAL / RETRY_COUNT,
      retry: RETRY_COUNT,
    },
  );

  // Start listening to broadcast success
  useEffect(() => {
    if (txInfoData != null && step === "broadcasting") {
      if (txInfoData.code) {
        dispatch({
          type: ActionType.BROADCAST_ERROR,
          txHash: txInfoData.txhash,
          txInfo: txInfoData,
        });
      } else {
        dispatch({
          type: ActionType.BROADCAST_SUCCESS,
          txHash: txInfoData.txhash,
          txInfo: txInfoData,
        });
      }
    }
  }, [step, txInfoData, txHash, dispatch]);

  // Can post if idle, success, or in an error state
  const canPost =
    Boolean(connectedWallet) &&
    (step === "idle" ||
      step === "postError" ||
      step === "broadcastError" ||
      step === "broadcastSuccess");

  const post = useCallback(
    async ({ msgs }) => {
      if (!canPost || connectedWallet == null) {
        console.log("Invalid state for post", step);
        return;
      }
      dispatch({ type: ActionType.POSTING });

      const fee = await estimateFee({
        client: lcdClient,
        address: connectedWallet,
        msgs,
        opts: {},
      });

      // Try posting the tx
      try {
        const res = await postTx({
          msgs,
          fee,
        });
        dispatch({
          type: ActionType.BROADCASTING,
          txHash: res.result.txhash,
        });
      } catch (err) {
        dispatch({
          type: ActionType.POST_ERROR,
          error: "error",
        });
      }
    },
    [canPost, connectedWallet, lcdClient, step, dispatch, postTx],
  );

  // Utility to reset state
  const reset = useCallback(() => {
    dispatch({ type: ActionType.RESET });
  }, [dispatch]);

  return {
    post,
    canPost,
    state: { step, txInfo, txHash, error },
    reset,
  };
}
