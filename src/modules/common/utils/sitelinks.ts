export const SITE_LINKS = {
    landing: () => `/`,
    dashboard: () => `/dashboard`,
    // Flex
    flexBuilderHome: () => `/flex-builder`,
    flexBuilder: (id: string) => `/flex-builder/${id}`,
    flexBuilderTemplate: () => `/flex-builder/custom-template`,
    flexecute: (path: string, address: string, name: string) => `/flexecute/${path}?name=${name}&contract=${address}`,
    // App
    appStore: () => `/app-store`,
    appBuilder: () => `/app-builder`,
    appCreate: ()=>`/app-builder/create`,
    // Assets
    assets: () => `/assets`,
    // Embedables
    embeddables: () => `embeddables`,
    learn: () => `/learn`
} as const;