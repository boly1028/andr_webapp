import { apolloClient } from "@/lib/graphql"
import { QUERY_KEPLR_CONFIG, QueryKeplrConfig, QueryKeplrConfigResponse } from "@andromedaprotocol/andromeda.js"
import { gql } from "@apollo/client"

export const queryKeplrConfig = async (chainId:string)=>{
    const config = await apolloClient.query<QueryKeplrConfigResponse, QueryKeplrConfig>({
        'query':gql`${QUERY_KEPLR_CONFIG}`,
        variables:{'identifier':chainId},
    })
    return config.data.keplrConfigs.config;
}