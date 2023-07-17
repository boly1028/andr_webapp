import { useEffect, useMemo, useState } from "react";
import useAndromedaClient from "./useAndromedaClient";
import useAndromedaContext from "./useAndromedaContext";

/**
 * Asynchronously fetches the code ID for a given ADO type. Relies on having a valid factory address and a connected client. Throws an error if no code ID is found.
 * @param adoType
 * @returns
 */
export default function useCodeId(adoType: string, version: string) {
  const [codeId, setCodeId] = useState<number>(-1);
  const { factoryAddress, connected } = useAndromedaContext();
  const client = useAndromedaClient();
  const getCodeId = async (key: string) => {
    console.log("Fetching Code Id for", key)
    try {
      const _codeId = await client?.adoDB?.getCodeId(key, factoryAddress);
      console.log(`CodeID for ${key} is ${_codeId}`)
      return _codeId
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
      let _codeId = await getCodeId(`${adoType}@${version}`);
      if (_codeId !== -1) {
        setCodeId(_codeId);
        return;
      }
      _codeId = await getCodeId(adoType);
      setCodeId(_codeId)
    }
    fetchCodeId();
  }, [factoryAddress, adoType, client, connected]);

  // console.log(connected, factoryAddress)

  return codeId;
}
