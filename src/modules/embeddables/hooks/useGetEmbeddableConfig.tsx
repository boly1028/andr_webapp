import { useAndromedaClient } from "@/lib/andrjs";
import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";
import { useAndromedaStore } from "@/zustand/andromeda";
import AndromedaClient from "@andromedaprotocol/andromeda.js";
import { useQuery } from "@tanstack/react-query";
import { EMBEDDABLE_DB } from "../constants";

export const useGetEmbeddabeleConfig = (key: string) => {
    const chainId = useAndromedaStore(state => state.chainId);
    const client = useAndromedaClient();
    const { data: config, isLoading, isError } = useQuery({
        queryKey: ['embeddable', 'list', 'item', chainId, key],
        queryFn: async () => {
            const data = await getEmbeddableConfig(client!, EMBEDDABLE_DB[chainId], key);
            data.key = key;
            data.chainId = chainId;
            return data;
        },
        enabled: !!client && !!EMBEDDABLE_DB[chainId]
    })
    return {
        config: config,
        loading: isLoading,
        error: isError
    }
}

export const getEmbeddableConfig = async (client: AndromedaClient, dbAddress: string, key: string) => {
    const query = {
        "get_value": {
            key
        }
    }
    const rawConfig = await client.chainClient?.queryClient?.queryContractSmart(dbAddress, query);
    const config: IEmbeddableConfig = JSON.parse(rawConfig.value.string);
    return config;
}