import type { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";
import useClient from "./useAndromedaClient";

/**
 * A hook for simulate an instantiate message on a given contract, returns an async simulation function
 * @param codeId
 * @returns
 */
export default function useSimulateInstantiate(
  codeId: number,
  label = "Instantiate",
) {
  const { client } = useClient();

  const simulate = useCallback(
    async (msg: Msg) => {
      return client.estimateInstantiationFee(codeId, msg, label);
    },
    [codeId, client, label],
  );

  return simulate;
}
