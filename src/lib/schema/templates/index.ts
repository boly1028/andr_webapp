import { IImportantAdoKeys } from "../types";
import { ITemplate } from "./types";

type PartialTemplateType = Omit<ITemplate, 'formData'> & {
  formData?: any
}

const APP_TEMPLATES: PartialTemplateType[] = [
  {
    id: "app",
    adoType: "app",
    name: "A Blank Canvas",
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

    // modules: [
    //   ...BASE_ADOS.map((ado) => ({ path: ado.source })),
    //   ...MODULES.map((ado) => ({ path: ado.source })),
    //   ...PRIMITIVES.map((ado) => ({ path: ado.source })),
    // ],
    modules: [
      {
        path: "auction/latest/auction",
      },
      {
        path: "cw721/latest/cw721",
      },
      {
        path: "marketplace/latest/marketplace",
      },
      {
        path: "rates/latest/rates",
      },
      {
        path: "splitter/latest/splitter",
      },
      {
        path: "address-list/latest/address-list",
      },
    ],
    system: true,
    starter: true,
  },
  // {
  //   id: "crowdfund",
  //   adoType: "app",
  //   name: "Crowdfund App",
  //   description:
  //     "Setup a crowdfund to distribute NFTs representing fractionalized ownership of the goal being funded. Proceeds are able to be divided and distributed to yield vaults to assure direct delivery to the respective manufacturing / distribution / business partnerships.",
  //   opts: ["Crowdfund", "CW721", "Vault", "Rates"],
  //   ados: [
  //     {
  //       path: IImportantAdoKeys.PUBLISH_SETTINGS,
  //       id: IImportantAdoKeys.PUBLISH_SETTINGS,
  //       required: true,
  //     },
  //     { path: "cw721/latest/cw721", id: "tokens", required: true },
  //     { path: "crowdfund/latest/crowdfund", id: "crowdfund", required: true },
  //     { path: "vault/latest/vault", id: "vault", required: true },
  //     { path: "rates/latest/rates", id: "rates", required: true },
  //   ],
  //   modules: [{ path: "vault/latest/vault" }],
  //   icon: "/app-templates/icons/crowdfund.png",
  //   installed: true,
  //   starter: true,
  // },
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
      {
        path: "address-list/latest/address-list",
      },
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
      "Setup a customizable NFT Marketplace/store to sell NFT’s for a specific price point. NFT’s can be sorted and filtered upon by many different attributes of the NFT’s themselves. The rates and address (Whitelist/Blacklist) list are also configurable and can be modified per marketplace instance. Proceeds will be collected and sent to the marketplace owner and NFT sent to the specific recipient of the purchase.",
    opts: ["Marketplace", "CW721", "Rates"],
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTINGS,
        id: IImportantAdoKeys.PUBLISH_SETTINGS,
        required: true,
      },
      { path: "cw721/latest/cw721", id: "tokens", required: true, "pos": {
        "x": 496,
        "y": 448
      } },
      {
        path: "marketplace/latest/marketplace",
        id: "marketplace",
        required: true,
        "pos": {
          "x": 496,
          "y": -144
        }
      },
      { path: "rates/latest/rates", id: "rates", 
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
      { path: "address-list/latest/address-list" },
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
];

export default APP_TEMPLATES;
