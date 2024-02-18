import { IImportantAdoKeys, ITemplate } from "../types";


export const EMBEDDABLE_TEMPLATES: (ITemplate & { preview?: string })[] = [
    {
        id: 'nft',
        adoType: "primitive",
        name: "Blank Embeddable",
        icon: "/embeddable/embAuctionIcon.png",
        description: "NFT embeddable to view your app live",
        opts: [
            "Import saved template",
            "Add on your prefered modules",
            "Save as a template",
            "Publish and use!",
        ],
        ados: [
            {
                path: IImportantAdoKeys.EMBEDDABLE_APP.path,
                id: IImportantAdoKeys.EMBEDDABLE_APP.key,
                required: true,
            },
        ],
        modules: [
            { 'path': 'embeddables/latest/auction' },
            { 'path': 'embeddables/latest/marketplace' },
            { 'path': 'embeddables/latest/crowdfund' },
        ],
    },
    {
        id: 'auction',
        adoType: "primitive",
        name: "Auction",
        icon: "/embeddable/embAuctionIcon.png",
        description: "Auction and CW721",
        opts: [
            "AUCTION",
            "CW721"
        ],
        ados: [
            {
                path: IImportantAdoKeys.EMBEDDABLE_APP.path,
                id: IImportantAdoKeys.EMBEDDABLE_APP.key,
                required: true,
            },
            {
                path: 'embeddables/latest/auction',
                id: "auction",
                required: true,
            },
        ],
        modules: [
            { 'path': 'embeddables/latest/auction' },
        ],
    },
    {
        id: 'marketplace',
        adoType: "primitive",
        name: "Marketplace",
        icon: "/embeddable/embAuctionIcon.png",
        description: "Marketplace and CW721",
        opts: [
            "MARKETPLACE",
            "CW721"
        ],
        ados: [
            {
                path: IImportantAdoKeys.EMBEDDABLE_APP.path,
                id: IImportantAdoKeys.EMBEDDABLE_APP.key,
                required: true,
            },
            {
                path: 'embeddables/latest/marketplace',
                id: "marketplace",
                required: true,
            },
        ],
        modules: [
            { 'path': 'embeddables/latest/marketplace' },
        ],
    },
    {
        id: 'crowdfund',
        adoType: "primitive",
        name: "Crowdfund",
        icon: "/embeddable/embAuctionIcon.png",
        description: "Crowdfund and CW721",
        opts: [
            "CROWDFUND",
            "CW721"
        ],
        ados: [
            {
                path: IImportantAdoKeys.EMBEDDABLE_APP.path,
                id: IImportantAdoKeys.EMBEDDABLE_APP.key,
                required: true,
            },
            {
                path: 'embeddables/latest/crowdfund',
                id: "crowdfund",
                required: true,
            },
        ],
        modules: [
            { 'path': 'embeddables/latest/crowdfund' },
        ],
    },
];