import {
    QUERY_KEPLR_CONFIG,
    QueryKeplrConfig,
    QueryKeplrConfigResponse
} from "@andromedaprotocol/andromeda.js";
import { QueryResult, gql, useQuery } from "@apollo/client";

export interface QueryKeplrConfigProps
    extends Pick<QueryResult<QueryKeplrConfigResponse, QueryKeplrConfig>, "loading" | "error"> {
    // Type should be array itself. Make an interface for asset and using Asset[] as response. Changes needed in the library
    data?: QueryKeplrConfigResponse["keplrConfigs"]["config"];
}

/**
 * Wrapper hook for the andr.js chain configs
 * @param chainId
 * @returns
 */
export function useQueryKeplrConfig(chainId: string): QueryKeplrConfigProps {
    const { loading, data, error } = useQuery<QueryKeplrConfigResponse, QueryKeplrConfig>(
        gql`
        ${QUERY_KEPLR_CONFIG}
      `,
        { variables: { identifier: chainId }, notifyOnNetworkStatusChange: true },
    );

    // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

    return {
        loading,
        error,
        data: data?.keplrConfigs.config
    };
}
