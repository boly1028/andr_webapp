import { useEffect, useMemo, useState } from "react";
import useAndromedaClient from "./useAndromedaClient";
import { useGetSchemaVersions } from "@/lib/schema/hooks/useGetSchemaVersion";
import { getAdoTypeWithVersion } from "../utils/ado";
import { useQuery } from "@tanstack/react-query";

/**
 * Asynchronously fetches the code ID for a given ADO type. Relies on having a valid factory address and a connected client. Throws an error if no code ID is found.
 * @param adoType
 * @returns
 */
export default function useCodeId(adoType: string, version?: string) {
  const { data: adoVersion } = useGetSchemaVersions(adoType as any);
  const { client, isConnected } = useAndromedaClient();

  const { data: codeId } = useQuery({
    queryKey: ['codeId', adoType, adoVersion, isConnected],
    queryFn: async () => {
      const _codeId = await getCodeId(getAdoTypeWithVersion(adoType, version ?? adoVersion?.latest ?? ''));
      return _codeId
    },
    enabled: isConnected && client.isConnected,
  })

  const getCodeId = async (key: string) => {
    console.log("Fetching Code Id for", key)
    try {
      const _codeId = await client?.os.adoDB?.getCodeId(key, client.os.adoDB.address ?? client.adoDB.address);
      console.log(`CodeID for ${key} is ${_codeId}`)
      return _codeId ?? -1
    } catch (err) {
      console.warn(err)
      return -1;
    }
  }

  return codeId || -1;
}
