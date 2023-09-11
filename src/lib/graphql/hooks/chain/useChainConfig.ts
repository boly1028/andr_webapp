import { useAllChainConfigQuery, useChainConfigQuery } from "@andromedaprotocol/gql/dist/react";

/**
 * Wrapper hook for the andr.js chain configs
 * @param chainId
 * @returns
 */
export function useQueryChainConfig(chainId: string) {
    const { loading, data, error } = useChainConfigQuery(
        { variables: { identifier: chainId }, notifyOnNetworkStatusChange: true },
    );

    // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

    return {
        loading,
        error,
        data: data?.chainConfigs.config
    };
}

/**
 * Wrapper hook for the andr.js all chain configs
 * @returns
 */
export function useQueryAllChainConfigs() {
    const { loading, data, error } = useAllChainConfigQuery(
        { variables: {}, notifyOnNetworkStatusChange: true },
    );

    // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

    return {
        loading,
        error,
        data: data?.chainConfigs.allConfigs?.filter(chain => !DISABLED_CHAIN_IDS.includes(chain.chainId))
    };
}

// Disable chains that are not currently supported for use
const DISABLED_CHAIN_IDS: string[] = ['atlantic-1','injective-888']
