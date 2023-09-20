import { ENABLE_LOCAL_CHAINS } from "@/constants/constants";
import { apolloClient } from "@/lib/graphql"
import { IChainConfigQuery, IKeplrConfigQuery, refetchChainConfigQuery, refetchKeplrConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react"

export const queryKeplrConfig = async (chainId: string) => {
    if (ENABLE_LOCAL_CHAINS) {
        const c = LOCAL_CHAINS_KEPLR_CONFIG.find(c => c.chainId === chainId);
        if (c) return c;
    }
    const config = await apolloClient.query<IKeplrConfigQuery>(refetchKeplrConfigQuery({ 'identifier': chainId }));
    return config.data.keplrConfigs.config;
}

export const queryChainConfig = async (chainId: string) => {
    if (ENABLE_LOCAL_CHAINS) {
        const c = LOCAL_CHAINS_CONFIG.find(c => c.chainId === chainId);
        if (c) return c;
    }
    const config = await apolloClient.query<IChainConfigQuery>(refetchChainConfigQuery({ 'identifier': chainId }));
    return config.data.chainConfigs.config;
}

export const LOCAL_CHAINS_CONFIG: Array<IChainConfigQuery['chainConfigs']['config']> = [
    {
        "addressPrefix": "osmo",
        "blockExplorerTxPages": [
            "https://testnet-explorer.publicawesome.dev/stargaze/tx/${txHash}"
        ],
        "blockExplorerAddressPages": [
            "https://testnet-explorer.publicawesome.dev/stargaze/account/${address}"
        ],
        "chainId": "localosmosis-1",
        "chainUrl": "http://18.212.50.191:20121/",
        "chainName": "Local Osmosis",
        "chainType": "local",
        "defaultFee": "0.25uosmo",
        "iconUrls": {
            "sm": "https://assets.coingecko.com/coins/images/22363/small/stars.png?1645256657",
            "lg": "https://assets.coingecko.com/coins/images/22363/large/stars.png?1645256657"
        },
        "kernelAddress": "osmo13ar5ahmk46m38c35fqr5wwhz6jwv44z7d3mp8pm8xzvchp89c5kqhvlsgr",
        "name": "localosmosis",
        "registryAddress": ""
    }
]
export const LOCAL_CHAINS_KEPLR_CONFIG: Array<IKeplrConfigQuery['keplrConfigs']['config']> = [
    {
        "bip44": {
            "coinType": 118,
        },
        "bech32Config": {
            "bech32PrefixAccPub": "osmopub",
            "bech32PrefixValPub": "osmovaloperpub",
            "bech32PrefixAccAddr": "osmo",
            "bech32PrefixConsPub": "osmovalconspub",
            "bech32PrefixValAddr": "osmovaloper",
            "bech32PrefixConsAddr": "osmovalcons",
        },
        "chainId": "localosmosis-1",
        "coinType": 118,
        "chainName": "osmo testnet",
        "currencies": [
            {
                "coinDenom": "OSMO",
                "coinGeckoId": "OSMO",
                "coinDecimals": 6,
                "coinMinimalDenom": "uosmo",
            }
        ],
        "feeCurrencies": [
            {
                "coinDenom": "OSMO",
                "coinGeckoId": "OSMO",
                "coinDecimals": 6,
                "coinMinimalDenom": "uosmo",
            }
        ],
        "gasPriceStep": {
            "average": 0.25,
            "low": 0.1,
            "high": 0.3,
        },
        "rpc": "http://18.212.50.191:20121/",
        "rest": "http://18.212.50.191:20221/",
        "stakeCurrency": {
            "coinDenom": "OSMO",
            "coinGeckoId": "OSMO",
            "coinDecimals": 6,
            "coinMinimalDenom": "uosmo",
        },
    }
]
