import { useEffect, useMemo, useState } from "react";
import useAndromedaClient from "./useAndromedaClient";
import { useGetSchemaVersions } from "@/lib/schema/hooks/useGetSchemaVersion";
import { getAdoTypeWithVersion } from "../utils/ado";
import { useQuery } from "@tanstack/react-query";
import AndromedaClient from "@andromedaprotocol/andromeda.js";

/**
 * Asynchronously fetches the code ID for a given ADO type. Relies on having a valid factory address and a connected client. Throws an error if no code ID is found.
 * @param adoType
 * @returns
 */
export default function useCodeId(adoType: string, version?: string) {
  const { data: adoVersion } = useGetSchemaVersions(adoType as any);
  const client = useAndromedaClient();


  const { data: codeId } = useQuery({
    queryKey: ['codeId', adoType, adoVersion, client?.os?.adoDB?.address, !!client],
    queryFn: async () => {
      const codeIdKey = getAdoTypeWithVersion(adoType, version ?? adoVersion?.latest ?? '');
      const _codeId = await getCodeId(client!, codeIdKey);
      return _codeId
    }
  })

  return codeId || -1;
}

export const getCodeId = async (client: AndromedaClient, key: string) => {
  console.log("Fetching Code Id for", key)
  try {
    console.log(client?.os?.adoDB?.address, "DEBUG::ADODB")
    console.log(client?.os?.address, "DEBUG::ADODB")
    // ERROR:: On connecting client to different chain, ado db address is still andr only. Fix needed in andrjs
    const _codeId = await client!.os.adoDB!.getCodeId(key, client!.os.adoDB!.address);
    console.log(`CodeID for ${key} is ${_codeId}`)
    return _codeId ?? -1
  } catch (err) {
    console.warn(err, "HERE")
    return -1;
  }
}
