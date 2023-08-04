import { useEffect, useMemo, useState } from "react";
import useAndromedaClient from "./useAndromedaClient";
import useAndromedaContext from "./useAndromedaContext";
import { useGetSchemaVersions } from "@/lib/schema/hooks/useGetSchemaVersion";
import { getAdoTypeWithVersion } from "../utils/ado";

/**
 * Asynchronously fetches the code ID for a given ADO type. Relies on having a valid factory address and a connected client. Throws an error if no code ID is found.
 * @param adoType
 * @returns
 */
export default function useCodeId(adoType: string, version?: string) {
  const [codeId, setCodeId] = useState<number>(-1);
  const { factoryAddress, connected } = useAndromedaContext();
  const { data: adoVersion } = useGetSchemaVersions(adoType as any);

  const client = useAndromedaClient();
  const getCodeId = async (key: string) => {
    console.log("Fetching Code Id for", key)
    try {
      const _codeId = await client?.os.adoDB?.getCodeId(key, factoryAddress);
      const _key = Buffer.from('version');
      const res = await client.chainClient?.queryClient?.queryContractRaw('andr1fz4gwrjc5p6lwmfp0ql6w8tl0xczn5xdln523ujtcvpua4gtcz3qh3hlt7', _key);
      if (res)
        console.log('::RES::', Buffer.from(res).toString());
      console.log(`CodeID for ${key} is ${_codeId}`)
      return _codeId ?? -1
    } catch (err) {
      console.warn(err)
      return -1;
    }
  }

  useEffect(() => {
    if (!connected || !client.isConnected) {
      console.warn("Querying codeId before client is connected")
      return;
    };
    const fetchCodeId = async () => {
      const _codeId = await getCodeId(getAdoTypeWithVersion(adoType, version ?? adoVersion?.latest ?? ''));
      setCodeId(_codeId);
    }
    fetchCodeId();
  }, [factoryAddress, adoType, client, connected]);

  // console.log(connected, factoryAddress)

  return codeId;
}
