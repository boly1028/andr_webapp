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
        description: "Setup an auction to sell NFT’s at an initial starting price and allow bidding from many users to get the highest price bid placed and accepted to receive the NFT. The duration of the auction is also configurable as well as the rate/royalty charged per NFT. Other options such as address lists can be added as well.",
        opts: [
            "Auction",
            "CW 721",
            "Rates"
        ],
        ados: [
            { path: "publish-settings", id: "publish-settings", required: true },
            { path: "cw721/0.1.0/cw721", id: "tokens", required: true },
            { path: "auction/0.1.0/auction", id: "auction", required: true },
            { path: "rates/0.1.0/rates", id: "rates", required: true },
        ],
        icon: ''
    }
];

export default APP_TEMPLATES;