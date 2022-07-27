import { EncodeObject } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import useClient from "./useAndromedaClient";

/**
 * A hook for simulate an execute message on a given contract, returns an async simulation function
 * @param address
 * @returns
 */
export default function useSimulateExecute() {
  const client = useClient();

  const simulate = useCallback(
    async (msgs: readonly EncodeObject[], memo?: string) => {
      return client.estimateFee(msgs, memo);
    },
    [client],
  );

  return simulate;
}
