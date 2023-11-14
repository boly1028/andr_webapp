/**
 * Store all the links/routes for the website here and use this instead of directly defining values
 * How to create new route?
 * - Static route => create a key with suitable name and add a function which returns the route.
 * - Dynamic route => create a key with suitable name and add a function which take dynamic variable as arg and return the route
 * 
 * General points to consider
 * - Start routes with '/' (always start from domain or baseUrl)
 * - Do not end route with '/' (if manually adding routes, a consistence design will be created)
 */

import { IChainConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react";


export const SITE_LINKS = {
    landing: () => `/`,
    dashboard: () => `/dashboard`,
    // Flex
    flexBuilderHome: () => `/flex-builder`,
    flexBuilder: (id: string) => `/flex-builder/${id}`,
    flexBuilderTemplate: (uri?: string, baseUrl?: string) => `${baseUrl ?? '/flex-builder/import'}${uri ? `?data=${uri}` : ''}`,
    adoExecute: (path: string, address: string, name?: string, appAddress?: string) => `/flexecute/${path}?address=${address}&name=${name || ''}&appAddress=${appAddress || ''}`,
    adoMultiExecute: (path: string, address: string, name?: string, appAddress?: string) => `/flexecute/multi-msg/${path}?address=${address}&name=${name || ''}&appAddress=${appAddress || ''}`,
    adoQuery: (path: string, address: string) => `/flexquery/${path}?address=${address}`,
    // App
    appStore: () => `/app-store`,
    appStoreItem: (id: string) => `/app-store/${id}`,
    appBuilder: (uri?: string) => `/app-builder${uri ? `?data=${uri}` : ''}`,
    // Assets
    assets: () => `/assets`,
    // Embedables
    embeddables: () => `/embeddables`,
    embeddablesBuild: (id: string) => `/embeddables/builder/${id}`,
    embeddablesUpdate: (id: string, key: string) => `/embeddables/builder/${id}?key=${key}`,
    embeddablesView: (id: string) => `/embeddables/view/${id}`,
    // Production Level Deployment
    embeddablePreview: (chainId: string, configUri: string) => `${process.env.NEXT_PUBLIC_EMBEDDABLE_URL}/preview?chain=${chainId}&config=${configUri}`,
    embeddablePublished: (chainId: string, eKey: string) => `${process.env.NEXT_PUBLIC_EMBEDDABLE_URL}/${chainId}/${eKey}`,
    embeddablePublishedCollection: (chainId: string, eKey: string, collection: string) => `${process.env.NEXT_PUBLIC_EMBEDDABLE_URL}/${chainId}/${eKey}/${collection}`,

    externalLearn: () => `https://docs.andromedaprotocol.io/guides/`,
    learn: () => `/learn`,
    learnItem: (slug: string) => `/learn${slug}`,
    cli: () => `/cli`,

    // External Documentation
    documentation: (adoType: string, anchor?: string) => `https://docs.andromedaprotocol.io/andromeda/andromeda-digital-objects/${adoType}#${anchor || adoType}`,
    doc: () => `https://docs.andromedaprotocol.io/andromeda`,
    blockExplorerAccount: (config: IChainConfigQuery['chainConfigs']['config'], address: string) => config.blockExplorerAddressPages[0]?.replaceAll("${address}", address),
    blockExplorerTx: (config: IChainConfigQuery['chainConfigs']['config'], txHash: string) => config.blockExplorerTxPages[0]?.replaceAll("${txHash}", txHash),

    testSchema: (path: string) => `/test/schema/${path}`,
    // USER Links
    userHome: () => `/user`,
    userDashboard: (address: string) => `/user/${address}`,
} as const;