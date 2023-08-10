import { ITemplate } from "./types";
import { IImportantAdoKeys } from "../types";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";


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
                path: 'embeddables/0.1.0/app',
                id: IImportantAdoKeys.EMBEDDABLE_APP,
                required: true,
            },
        ],
        modules: [
            { 'path': 'embeddables/0.1.0/auction' },
            { 'path': 'embeddables/0.1.0/marketplace' },
            { 'path': 'embeddables/0.1.0/crowdfund' },
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
                path: 'embeddables/0.1.0/app',
                id: IImportantAdoKeys.EMBEDDABLE_APP,
                required: true,
            },
            {
                path: 'embeddables/0.1.0/auction',
                id: "auction",
                required: true,
            },
        ],
        modules: [
            { 'path': 'embeddables/0.1.0/auction' },
        ],
        preview:SITE_LINKS.embeddablePreview('auction')
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
                path: 'embeddables/0.1.0/app',
                id: IImportantAdoKeys.EMBEDDABLE_APP,
                required: true,
            },
            {
                path: 'embeddables/0.1.0/marketplace',
                id: "marketplace",
                required: true,
            },
        ],
        modules: [
            { 'path': 'embeddables/0.1.0/marketplace' },
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
                path: 'embeddables/0.1.0/app',
                id: IImportantAdoKeys.EMBEDDABLE_APP,
                required: true,
            },
            {
                path: 'embeddables/0.1.0/crowdfund',
                id: "crowdfund",
                required: true,
            },
        ],
        modules: [
            { 'path': 'embeddables/0.1.0/crowdfund' },
        ],
    },
];