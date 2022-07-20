import type { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";
import useClient from "./useAndromedaClient";

/**
 * A hook for performing an instantiate message for a given code ID, returns an async instantiate function
 * @param codeId
 * @returns
 */
export default function useInstantiate(codeId: number) {
  const client = useClient();

  const instantiate = useCallback(
    async (msg: Msg, label: string, fee: Fee = "auto") => {
      return client.instantiate(codeId, msg, label, fee);
    },
    [codeId, client],
  );

  return instantiate;
}
