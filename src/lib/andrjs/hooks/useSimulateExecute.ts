import type { Msg } from "@andromedaprotocol/andromeda.js";
import { StdFee } from "@cosmjs/amino";
import { Coin } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import useClient from "./useAndromedaClient";

/**
 * A hook for simulate an execute message on a given contract, returns an async simulation function
 * @param address
 * @returns
 */
export default function useSimulateExecute(address: string) {
  const client = useClient();

  const simulate = useCallback(
    async (msg: Msg, funds: Coin[], fee?: StdFee, memo?: string) => {
      return client.estimateExecuteFee(address, msg, funds, fee, memo);
    },
    [address, client],
  );

  return simulate;
}
