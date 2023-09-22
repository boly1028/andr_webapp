import { useAndromedaClient } from "@/lib/andrjs";
import { useAndromedaStore } from "@/zustand/andromeda";
import AndromedaClient from "@andromedaprotocol/andromeda.js";
import { useQuery } from "@tanstack/react-query";
import { EMBEDDABLE_DB } from "../constants";


export const useGetEmbeddableKeys = (searchAddress: string) => {
    const chainId = useAndromedaStore(state => state.chainId);
    const client = useAndromedaClient();
    const { data: keys, isLoading } = useQuery({
        queryKey: ['embeddable', 'list', chainId, searchAddress],
        queryFn: async () => {
            const keys = await getOwnerApps(client!, EMBEDDABLE_DB[chainId], searchAddress);
            return keys;
        },
        enabled: !!client && !!EMBEDDABLE_DB[chainId],
        refetchOnWindowFocus: false
    })
    return {
        keys: keys,
        loading: isLoading
    }
}

export const getOwnerApps = async (client: AndromedaClient, dbAddress: string, address: string) => {
    const query = {
        "owner_keys": {
            "owner": address
        }
    }
    const keys = await client.chainClient?.queryClient?.queryContractSmart(dbAddress, query) as string[];
    return keys;
}