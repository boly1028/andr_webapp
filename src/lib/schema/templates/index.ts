import { IAdoType, IImportantAdoKeys } from "../types";
import { ALL_ADOS } from "../utils/list";
import { MASTER_ALLADO } from "../utils/masterList";
import { IAdo, ITemplate } from "./types";

type PartialTemplateType = Omit<ITemplate, 'formData'> & {
  formData?: any
}

const APP_TEMPLATES: PartialTemplateType[] = [
  {
    id: IImportantAdoKeys.BLANK_CANVAS,
    adoType: "app",
    name: "Empty Project",
    icon: "/app-templates/icons/blank.png",
    description:
      "Start from scratch building out your own ADO structure to be just the way you like it.",
    opts: [
      "Select your Base ADO functionality",
      "Add on your prefered modules",
      "Save as a template",
      "Publish and use!",
    ],
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTINGS,
        id: IImportantAdoKeys.PUBLISH_SETTINGS,
        required: true,
      },
    ],

    modules: [
      ...ALL_ADOS.map((ado) => ({ path: ado.source }))
    ],
    // modules: [
    //   {
    //     path: "auction/latest/auction",
    //   },
    //   {
    //     path: "cw721/latest/cw721",
    //   },
    //   {
    //     path: "rates/latest/rates",
    //   },
    //   {
    //     path: "splitter/latest/splitter",
    //   },
    //   { path: "marketplace/latest/marketplace" },
    //   {
    //     path: "crowdfund/latest/crowdfund"
    //   },
    //   // {
    //   //   path: "address-list/latest/address-list",
    //   // },
    // ],
    system: true,
    starter: true,
  },
  {
    id: "auction-market",
    adoType: "app",
    name: "Auction Based Marketplace",
    description:
      "Setup an auction to sell NFT’s at an initial starting price and allow bidding from many users to get the highest price bid placed and accepted to receive the NFT. The duration of the auction is also configurable as well as the rate/royalty charged per NFT. Other options such as address lists can be added as well.",
    opts: ["Auction", "CW721", "Rates"],
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTINGS,
        id: IImportantAdoKeys.PUBLISH_SETTINGS,
        required: true,
      },
      {
        path: "cw721/latest/cw721", id: "tokens", required: true, "pos": {
          "x": 496,
          "y": 368
        }
      },
      {
        path: "auction/latest/auction", id: "auction", required: true, "pos": {
          "x": 496,
          "y": -144
        }
      },
      {
        path: "rates/latest/rates", id: "rates", required: false, enabled: true, "pos": {
          "x": -112,
          "y": -144
        }
      },
    ],
    modules: [
      {
        path: "cw721/latest/cw721",
      },
      {
        path: "auction/latest/auction",
      },
      {
        path: "splitter/latest/splitter",
      },
      {
        path: "rates/latest/rates",
      },
      { path: "marketplace/latest/marketplace" },
      // {
      //   path: "address-list/latest/address-list",
      // },
    ],
    icon: "/app-templates/icons/auction-market.png",
    installed: true,
    starter: true,
    formData: {
      "taxes": {
      },
      "auction": {
        "modules": [
          {
            "address": {
              "identifier": "rates"
            },
            "is_mutable": true,
            "module_type": "rates"
          }
        ]
      },
      "tokens": {
        "minter": {},
      }
    }
  },
  {
    id: "market",
    adoType: "app",
    name: "Flat Rate Marketplace",
    description:
      "Setup a customizable NFT Marketplace/store to sell NFT’s for a specific price point. The rates and address (Whitelist/Blacklist) list are also configurable and can be modified per marketplace instance. Proceeds will be collected and sent to the marketplace owner and NFT sent to the specific recipient of the purchase.",
    opts: ["Marketplace", "CW721", "Rates"],
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTINGS,
        id: IImportantAdoKeys.PUBLISH_SETTINGS,
        required: true,
      },
      {
        path: "cw721/latest/cw721", id: "tokens", required: true, "pos": {
          "x": 496,
          "y": 448
        }
      },
      {
        path: "marketplace/latest/marketplace",
        id: "marketplace",
        required: true,
        "pos": {
          "x": 496,
          "y": -144
        }
      },
      {
        path: "rates/latest/rates", id: "rates",
        required: false,
        enabled: true,
        "pos": {
          "x": -112,
          "y": -144
        }
      },
    ],
    modules: [
      { path: "cw721/latest/cw721" },
      { path: "marketplace/latest/marketplace" },
      { path: "rates/latest/rates" },
      // { path: "address-list/latest/address-list" },
      { path: "splitter/latest/splitter" }
    ],
    icon: "/app-templates/icons/market.png",
    installed: true,
    starter: true,

    formData: {
      "marketplace": {
        "modules": [
          {
            "address": {
              "identifier": "rates"
            },
            "is_mutable": true,
            "module_type": "rates"
          }
        ]
      },
      "tokens": {
        "minter": {},
      }
    }
  },
  {
    id: "crowdfund",
    adoType: "app",
    name: "Crowdfund App",
    description:
      "Setup a crowdfund to distribute NFTs representing fractionalized ownership of the goal being funded. Proceeds are able to be divided and distributed to yield vaults to assure direct delivery to the respective manufacturing / distribution / business partnerships.",
    opts: ["Crowdfund", "CW721", "Vault", "Rates"],
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTINGS,
        id: IImportantAdoKeys.PUBLISH_SETTINGS,
        required: true,
      },
      {
        path: "cw721/latest/cw721", id: "Tokens",
        required: true,
        enabled: true,
        "pos": { "x": -16, "y": 800 }
      },
      {
        path: "crowdfund/latest/crowdfund", id: "Crowdfund", required: true,
        "pos": { "x": 672, "y": 1248 }
      },
      { path: "vault/latest/vault", id: "Vault", required: false, enabled: true, "pos": { "x": 688, "y": 1968 } },
      { path: "rates/latest/rates", id: "Rates", required: false, enabled: true, "pos": { "x": 0, "y": 1872 } },
    ],
    modules: [{ path: "vault/latest/vault" }],
    icon: "/app-templates/icons/crowdfund.png",
    installed: true,
    starter: true,
    formData: {
      "Rates": {
        "rates": [
          {
            "is_additive": false,
            "rate": {
              "percent": {
                "percent": "0.10"
              }
            },
            "recipients": [
              {
                "a_d_o": {
                  "address": {
                    "identifier": "Vault"
                  }
                }
              }
            ],
            "description": "10% Reduction to Vault"
          }
        ]
      },
      "Crowdfund": {
        "can_mint_after_sale": false,
        "modules": [
          {
            "address": {
              "identifier": "Rates"
            },
            "is_mutable": false,
            "module_type": "rates"
          }
        ],
        "token_address": {
          "identifier": "Tokens"
        }
      },
      "Tokens": {
        "minter": {
          "identifier": "Crowdfund"
        }
      }
    }
  },
  {
    id: "cw20-exchange",
    adoType: "app",
    name: "CW20 Exchange",
    icon: "/app-templates/icons/cw20-staking.png",
    description: "CW20 Exchange creates a unique digital asset to be sold on an independent exchange with support for configuring transactions to be split and distributed to multiple destinations. Buyers can easily purchase fractional shares of the CW20 token, allowing for greater accessibility and liquidity. This simple and efficient exchange platform supports purchase options for both native and non-native token.",
    opts: ["CW20", "cw20 exchange"],
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTINGS,
        id: IImportantAdoKeys.PUBLISH_SETTINGS,
        required: true,
      },
      { path: "cw20/latest/cw20", id: "tokens", required: true, "pos": { "x": 0, "y": 0 } },
      { path: "cw20-exchange/latest/cw20-exchange", id: "cw20-exchange", required: true, "pos": { "x": 528, "y": -384 } },
    ],
    modules: [
      { path: "cw20/latest/cw20" },
      { path: "cw20-exchange/latest/cw20-exchange" },
      { path: "rates/latest/rates" },
      { path: "splitter/latest/splitter" },
    ],
    system: false,
    installed: true,
    starter: true,
    formData: { "cw20-exchange": { "token_address": { "identifier": "tokens" } } },
  },
  // {
  //   id: "cw20-staking",
  //   adoType: "app",
  //   name: "CW20 Token Staking",
  //   description:
  //     " Setup a means of offering the ability to stake a specific coin and have associated rewards that are aligned to duration of the time of staking. Multiple staking timeframes can be set up with varying percentages of staking reward benefits. The ability to unstake or lock users in is also present.",
  //   opts: ["CW20", "CW20 Staking"],
  //   ados: [
  //     {
  //       path: IImportantAdoKeys.PUBLISH_SETTINGS,
  //       id: IImportantAdoKeys.PUBLISH_SETTINGS,
  //       required: true,
  //     },
  //     { path: "cw20/latest/cw20", id: "tokens", required: true },
  //     {
  //       path: "cw20-staking/latest/cw20-staking",
  //       id: "staking",
  //       required: true,
  //     },
  //   ],
  //   modules: [
  //     { path: "cw20/latest/cw20" },
  //     { path: "cw20-staking/latest/cw20-staking" },
  //     { path: "address-list/latest/address-list" },
  //   ],
  //   icon: "/app-templates/icons/cw20-staking.png",
  //   installed: true,
  //   starter: true,
  // },
  {
    id: 'admin-panel',
    adoType: "app",
    name: "Admin Panel",
    icon: "/app-templates/icons/blank.png",
    description:
      "Admin template which contains all ados including those which are in beta phase",
    opts: [
      "ADO's are in development phase",
      "Breaking changes",
      "Loss of ADO",
      "Only for admin/testing purpose",
    ],
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTINGS,
        id: IImportantAdoKeys.PUBLISH_SETTINGS,
        required: true,
      },
    ],

    modules: [
      ...MASTER_ALLADO.map((ado) => ({ path: ado.source }))
    ],
    system: true,
    starter: false,
  },
  ...MASTER_ALLADO.map(ado => ({
    id: ado.$id,
    adoType: ado.$id as IAdoType,
    name: ado.title,
    description: ado.description,
    opts: [ado.$id],
    ados: [
      {
        path: ado.source,
        id: ado.$id,
        required: true,
      },
    ],
    modules: [
      // { path: "adodb/latest/adodb" },
    ],
    icon: "/app-templates/icons/market.png",
    installed: true,
    starter: true,
    formData: {
    }
  }))
];

export default APP_TEMPLATES;
