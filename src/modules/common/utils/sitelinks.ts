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

import { ChainConfig } from "@andromedaprotocol/andromeda.js";

export const SITE_LINKS = {
    landing: () => `/`,
    dashboard: () => `/dashboard`,
    // Flex
    flexBuilderHome: () => `/flex-builder`,
    flexBuilder: (id: string) => `/flex-builder/${id}`,
    flexBuilderTemplate: (uri?: string) => `/flex-builder/custom-template${uri ? `?data=${uri}` : ''}`,
    adoExecute: (path: string, address: string) => `/flexecute/${path}?contract=${address}`,
    proxyApp: (path: string, address: string, name: string) => `/flexecute/proxy/${path}?name=${name}&contract=${address}`,
    // App
    appStore: () => `/app-store`,
    appStoreItem: (id: string) => `/app-store/${id}`,
    appBuilder: () => `/app-builder`,
    appCreate: () => `/app-builder/create`,
    // Assets
    assets: () => `/assets`,
    // Embedables
    embeddables: () => `/embeddables`,
    // embeddables: () => `https://andromedaprotocol.github.io/embeddable-marketplace-demo`,
    learn: () => `/learn`,
    learnItem: (slug: string) => `/learn${slug}`,
    cli: () => `/cli`,

    // External Documentation
    documentation: (adoType: string, anchor?: string) => `https://docs.andromedaprotocol.io/andromeda/andromeda-digital-objects/${adoType}#${anchor || adoType}`,
    doc: () => `https://docs.andromedaprotocol.io/andromeda`,
    blockExplorerAccount: (config: ChainConfig, address: string) => config.blockExplorerAddressPages[0]?.replaceAll("${address}", address),
    blockExplorerTx: (config: ChainConfig, txHash: string) => config.blockExplorerTxPages[0]?.replaceAll("${txHash}", txHash),
    
    testSchema: (path: string) => `/test/schema/${path}`
} as const;