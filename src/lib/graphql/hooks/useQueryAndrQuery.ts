import { useAndromedaClient } from "@/lib/andrjs";
import { IAdoType } from "@/lib/schema/types";
import { useQuery } from "@tanstack/react-query";


/**
 * Get Andr Result for given ADO.
 * @param address
 * @returns
 */
export default function useQueryAndrQuery(
  address: string
) {

  const client = useAndromedaClient()

  const { data, error, isLoading } = useQuery(
    ["query", "andr", address],
    async () => {
      console.log("REFETCHING", address)
      const result: IAndrResult = {
        owner: await client.ado.getOwner(address),
        version: await client.ado.getVersion(address),
        blockHeightUponCreation: await client.ado.getCreatedHeight(address),
        type: await client.ado.getType(address) as IAdoType,
        address: address,
        originalPublisher: await client.ado.getPublisher(address),
      };
      return result;
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: client.isConnected,
    }
  )

  return {
    loading: isLoading,
    error,
    data: data,
  };
}

interface IAndrResult {
  version: string;
  blockHeightUponCreation: number;
  owner: string;
  type: IAdoType;
  address: string;
  originalPublisher: string;
}