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

import { IAdoType } from "@/lib/schema/types";

export const SITE_LINKS = {
    landing: () => `/`,
    dashboard: () => `/dashboard`,
    // Flex
    flexBuilderHome: () => `/flex-builder`,
    flexBuilder: (id: string) => `/flex-builder/${id}`,
    flexBuilderTemplate: () => `/flex-builder/custom-template`,
    adoExecute: (path: string, address: string) => `/flexecute/${path}?contract=${address}`,
    proxyApp: (path: string, address: string, name: string) => `/flexecute/proxy/${path}?name=${name}&contract=${address}`,
    // App
    appStore: () => `/app-store`,
    appBuilder: () => `/app-builder`,
    appCreate: () => `/app-builder/create`,
    // Assets
    assets: () => `/assets`,
    // Embedables
    embeddables: () => `/embeddables`,
    learn: () => `/learn`,

    // External Documentation
    documentation: (adoType: string) => `https://docs.andromedaprotocol.io/andromeda/andromeda-digital-objects/${adoType}`
} as const;