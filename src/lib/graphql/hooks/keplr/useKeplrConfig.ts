import { useKeplrConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react";

/**
 * Wrapper hook for the andr.js chain configs
 * @param chainId
 * @returns
 */
export function useQueryKeplrConfig(chainId: string) {
    const { loading, data, error } = useKeplrConfigQuery(
        { variables: { identifier: chainId }, notifyOnNetworkStatusChange: true },
    );

    // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

    return {
        loading,
        error,
        data: data?.keplrConfigs.config
    };
}
