import { useEffect, useMemo, useState } from "react";
import useAndromedaClient from "./useAndromedaClient";
import useAndromedaContext from "./useAndromedaContext";

/**
 * Asynchronously fetches the code ID for a given ADO type. Relies on having a valid factory address and a connected client. Throws an error if no code ID is found.
 * @param adoType
 * @returns
 */
export default function useCodeId(adoType: string) {
  const [codeId, setCodeId] = useState<number>(-1);
  const { factoryAddress, connected } = useAndromedaContext();
  const client = useAndromedaClient();
  const queryMsg = useMemo(
    () => ({
      code_id: {
        key: adoType,
      },
    }),
    [adoType],
  );

  useEffect(() => {
    const getCodeId = async () => {
      if (!connected) {
        console.warn("Querying Code ID before client connected");
        return;
      }

      if (factoryAddress.length === 0) {
        console.warn("No factory address");
        return;
      }

      const _codeId = await client.queryContract(factoryAddress, queryMsg);
      setCodeId(_codeId);
    };
    getCodeId();
  }, [factoryAddress, queryMsg, client, connected]);

  return codeId;
}
