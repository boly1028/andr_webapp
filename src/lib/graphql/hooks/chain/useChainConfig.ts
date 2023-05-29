import {
    QUERY_ALL_CHAIN_CONFIGS,
    QUERY_CHAIN_CONFIG,
    QueryAllChainConfigs,
    QueryAllChainConfigsResponse,
    QueryChainConfig,
    QueryChainConfigResponse
} from "@andromedaprotocol/andromeda.js";
import { QueryResult, gql, useQuery } from "@apollo/client";

export interface QueryChainConfigProps
    extends Pick<QueryResult<QueryChainConfigResponse, QueryChainConfig>, "loading" | "error"> {
    // Type should be array itself. Make an interface for asset and using Asset[] as response. Changes needed in the library
    data?: QueryChainConfigResponse["chainConfigs"]["config"];
}

/**
 * Wrapper hook for the andr.js chain configs
 * @param chainId
 * @returns
 */
export function useQueryChainConfig(chainId: string): QueryChainConfigProps {
    const { loading, data, error } = useQuery<QueryChainConfigResponse, QueryChainConfig>(
        gql`
        ${QUERY_CHAIN_CONFIG}
      `,
        { variables: { identifier: chainId }, notifyOnNetworkStatusChange: true },
    );

    // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

    return {
        loading,
        error,
        data: data?.chainConfigs.config
    };
}


export interface QueryAllChainConfigsProps
    extends Pick<QueryResult<QueryAllChainConfigsResponse, QueryAllChainConfigs>, "loading" | "error"> {
    // Type should be array itself. Make an interface for asset and using Asset[] as response. Changes needed in the library
    data?: QueryAllChainConfigsResponse["chainConfigs"]["allConfigs"];
}


/**
 * Wrapper hook for the andr.js all chain configs
 * @returns
 */
export function useQueryAllChainConfigs(): QueryAllChainConfigsProps {
    const { loading, data, error } = useQuery<QueryAllChainConfigsResponse, QueryAllChainConfigs>(
        gql`
        ${QUERY_ALL_CHAIN_CONFIGS}
      `,
        { variables: {}, notifyOnNetworkStatusChange: true },
    );

    // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

    return {
        loading,
        error,
        data: data?.chainConfigs.allConfigs?.filter(chain => !DISABLED_CHAIN_IDS.includes(chain.chainId))
    };
}

const DISABLED_CHAIN_IDS: string[] = ['atlantic-1']
