export const SITE_LINKS = {
    landing: () => `/`,
    dashboard: () => `/dashboard`,
    // Flex
    flexBuilderHome: () => `/flex-builder`,
    flexBuilder: (id: string) => `/flex-builder/${id}`,
    flexecute: (path: string, address: string, name: string) => `/flexecute/${path}?name=${name}&address=${address}`,
    // App
    appStore: () => `/app-store`,
    appBuilder: () => `/app-builder`,
    // Assets
    assets: () => `/assets`,
    // Embedables
    embeddables: () => `embeddables`,
    learn: () => `/learn`
} as const;