import baseAdo from '../schema/baseADO.json'
import modules from '../schema/module.json'
import primitive from '../schema/primitive.json'
import { ITemplate } from './types';

const APP_TEMPLATES: ITemplate[] = [
    {
        id: "app",
        name: "A Blank Canvas",
        icon: "",
        description:
            "You don't have to use a template! Start from scratch building out your own ADO structure to be just the way you like it.",
        opts: [
            "Select your Base ADO functionality",
            "Add on your prefered modules",
            "Save as a template",
            "Publish and use!",
        ],
        ados: [
            { path: "publish-settings", id: "publish-settings", required: true },
        ],

        modules: [
            ...baseAdo.map(ado => ({ path: ado.source })),
            ...modules.map(ado => ({ path: ado.source })),
            ...primitive.map(ado => ({ path: ado.source })),
        ],
    },
    {
        id: 'crowdfund',
        name: 'Crowdfund App',
        description: "Setup a crowdfund to distribute NFTs representing fractionalized ownership of the goal being funded. Proceeds are able to be divided and distributed to yield vaults to assure direct delivery to the respective manufacturing / distribution / business partnerships.",
        opts: [
            "Crowdfund",
            "CW721",
            "Vault",
            "Rates"
        ],
        ados: [
            { path: "publish-settings", id: "publish-settings", required: true },
            { path: "cw721/0.1.0/cw721", id: "tokens", required: true },
            { path: "crowdfund/0.1.0/crowdfund", id: "crowdfund", required: true },
            { path: "vault/0.1.0/vault", id: "vault", required: true },
            { path: "rates/0.1.0/rates", id: "rates", required: true },
        ],
        icon: ''
    },
    {
        id: 'auction-market',
        name: 'Auction Based Marketplace',
        description: "Setup an auction to sell NFT’s at an initial starting price and allow bidding from many users to get the highest price bid placed and accepted to receive the NFT. The duration of the auction is also configurable as well as the rate/royalty charged per NFT. Other options such as address lists can be added as well.",
        opts: [
            "Auction",
            "CW721",
            "Rates"
        ],
        ados: [
            { path: "publish-settings", id: "publish-settings", required: true },
            { path: "cw721/0.1.0/cw721", id: "tokens", required: true },
            { path: "auction/0.1.0/auction", id: "auction", required: true },
            { path: "rates/0.1.0/rates", id: "rates", required: true },
        ],
        icon: ''
    },
    {
        id: 'market',
        name: 'Flat Rate Marketplace',
        description: "Setup a customizable NFT Marketplace/store to sell NFT’s for a specific price point. NFT’s can be sorted and filtered upon by many different attributes of the NFT’s themselves. The rates and address (Whitelist/Blacklist) list are also configurable and can be modified per marketplace instance. Proceeds will be collected and sent to the marketplace owner and NFT sent to the specific recipient of the purchase.",
        opts: [
            "Marketplace",
            "CW721",
            "Rates"
        ],
        ados: [
            { path: "publish-settings", id: "publish-settings", required: true },
            { path: "cw721/0.1.0/cw721", id: "tokens", required: true },
            { path: "marketplace/0.1.0/marketplace", id: "marketplace", required: true },
            { path: "rates/0.1.0/rates", id: "rates", required: true },
            { path: "address-list/0.1.0/address-list", id: "whitelist", required: true },
        ],
        icon: ''
    },
    {
        id: 'cw20-staking',
        name: 'CW20 Token Staking',
        description: " Setup a means of offering the ability to stake a specific coin and have associated rewards that are aligned to duration of the time of staking. Multiple staking timeframes can be set up with varying percentages of staking reward benefits. The ability to unstake or lock users in is also present.",
        opts: [
            "CW20",
            "CW20 Staking",
        ],
        ados: [
            { path: "publish-settings", id: "publish-settings", required: true },
            { path: "cw20/0.1.0/cw20", id: "tokens", required: true },
            { path: "cw20-staking/0.1.0/cw20-staking", id: "staking", required: true },
        ],
        icon: '/app-store/templates/icon.png'
    }
];

export default APP_TEMPLATES;