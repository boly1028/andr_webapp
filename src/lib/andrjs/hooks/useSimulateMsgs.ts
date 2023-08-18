import { StdFee } from "@cosmjs/amino";
import { EncodeObject } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import useClient from "./useAndromedaClient";

/**
 * A hook for simulate encoded messages, returns an async simulation function
 * @returns
 */
export default function useSimulateExecute() {
  const { client } = useClient();

  const simulate = useCallback(
    async (msgs: readonly EncodeObject[], fee?: StdFee, memo?: string) => {
      return client.estimateFee(msgs, fee, memo);
    },
    [client],
  );

  return simulate;
}
