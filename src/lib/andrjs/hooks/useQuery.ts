import type { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";
import useClient from "./useAndromedaClient";

/**
 * A hook for performing a query message on a given contract, returns an async query function
 * @param address
 * @returns
 */
export default function useQuery(address: string) {
  const { client } = useClient();

  const query = useCallback(
    async (msg: Msg) => {
      try {
        const resp = await client.queryContract(address, msg);
        return resp;
      } catch (error) {
        console.error(`Error with query: ${JSON.stringify(msg, undefined, 2)}`);
        console.error(error);
        return;
      }
    },
    [address, client],
  );

  return query;
}
