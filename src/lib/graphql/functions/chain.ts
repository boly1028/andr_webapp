import { apolloClient } from "@/lib/graphql"
import { IChainConfigQuery, IKeplrConfigQuery, refetchChainConfigQuery, refetchKeplrConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react"

export const queryKeplrConfig = async (chainId: string) => {
    const config = await apolloClient.query<IKeplrConfigQuery>(refetchKeplrConfigQuery({ 'identifier': chainId }));
    return config.data.keplrConfigs.config;
}

export const queryChainConfig = async (chainId: string) => {
    const config = await apolloClient.query<IChainConfigQuery>(refetchChainConfigQuery({ 'identifier': chainId }));
    return config.data.chainConfigs.config;
}