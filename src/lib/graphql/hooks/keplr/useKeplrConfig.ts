import { ENABLE_LOCAL_CHAINS } from "@/constants/constants";
import { useKeplrConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react";
import { LOCAL_CHAINS_KEPLR_CONFIG } from "../../functions/chain";

/**
 * Wrapper hook for the andr.js chain configs
 * @param chainId
 * @returns
 */
export function useQueryKeplrConfig(chainId: string) {
    const { loading, data, error } = useKeplrConfigQuery(
        { variables: { identifier: chainId }, notifyOnNetworkStatusChange: true },
    );
    if (ENABLE_LOCAL_CHAINS) {
        const c = LOCAL_CHAINS_KEPLR_CONFIG.find(c => c.chainId === chainId);
        if (c) return {
            loading: false,
            error: undefined,
            data: c
        };
    }
    // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

    return {
        loading,
        error,
        data: data?.keplrConfigs.config
    };
}
