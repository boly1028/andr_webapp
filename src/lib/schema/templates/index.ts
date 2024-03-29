import { cloneDeep } from "@apollo/client/utilities";
import { IImportantAdoKeys, ITemplate } from "../types";
import { BLANK_APP_TEMPLATE } from "./blank";
import { MAX_APP_LIMIT } from "../constants";

type PartialTemplateType = Omit<ITemplate, 'formData'> & {
  formData?: any
}

const APP_TEMPLATES: PartialTemplateType[] = [
  cloneDeep(BLANK_APP_TEMPLATE),
  {
    id: "auction-market",
    adoType: "app-contract",
    name: "Auction Based Marketplace",
    description:
      "Setup an auction to sell NFT’s at an initial starting price and allow bidding from many users to get the highest price bid placed and accepted to receive the NFT. The duration of the auction is also configurable as well as the rate/royalty charged per NFT. Other options such as address lists can be added as well.",
    opts: ["Auction", "CW721", "Rates"],
    adoLimit: MAX_APP_LIMIT,
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTING.path,
        id: IImportantAdoKeys.PUBLISH_SETTING.key,
        required: true,
      },
      {
        "id": "tokens",
        "path": "cw721/latest/cw721",
        "required": true,
        "enabled": true,
        "pos": {
          "x": -416,
          "y": 96
        }
      },
      {
        "id": "auction",
        "path": "auction/latest/auction",
        "required": true,
        "enabled": true,
        "pos": {
          "x": 176,
          "y": -160
        }
      },
      {
        "id": "rates",
        "path": "rates/latest/rates",
        "required": false,
        "removable": false,
        "enabled": true,
        "pos": {
          "x": -416,
          "y": -160
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
      }
    ],
    icon: "/app-templates/icons/auction-market.png",
    installed: true,
    starter: true,
    formData: {
      "rates": {
        "kernel_address": "",
        "rates": [],
      },
      "auction": {
        "kernel_address": "",
        "modules": [
          {
            "is_mutable": true,
            "address": "./rates",
            "name": "rates"
          }
        ],
      },
      "tokens": {
        "kernel_address": "",
      },
      "publish-settings": {
      }
    }
  },
  {
    id: "market",
    adoType: "app-contract",
    name: "Flat Rate Marketplace",
    description:
      "Setup a customizable NFT Marketplace/store to sell NFT’s for a specific price point. The rates and address (Whitelist/Blacklist) list are also configurable and can be modified per marketplace instance. Proceeds will be collected and sent to the marketplace owner and NFT sent to the specific recipient of the purchase.",
    opts: ["Marketplace", "CW721", "Rates"],
    adoLimit: MAX_APP_LIMIT,
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTING.path,
        id: IImportantAdoKeys.PUBLISH_SETTING.key,
        required: true,
      },
      {
        "id": "tokens",
        "path": "cw721/latest/cw721",
        "required": true,
        "enabled": true,
        "pos": {
          "x": 0,
          "y": 386.5
        }
      },
      {
        "id": "marketplace",
        "path": "marketplace/latest/marketplace",
        "required": true,
        "enabled": true,
        "pos": {
          "x": 530,
          "y": 0
        }
      },
      {
        "id": "rates",
        "path": "rates/latest/rates",
        "required": false,
        "removable": false,
        "enabled": true,
        "pos": {
          "x": 0,
          "y": 172.5
        }
      },
    ],
    modules: [
      { path: "cw721/latest/cw721" },
      { path: "marketplace/latest/marketplace" },
      { path: "rates/latest/rates" },
      { path: "splitter/latest/splitter" }
    ],
    icon: "/app-templates/icons/market.png",
    installed: true,
    starter: true,
    formData: {
      "marketplace": {
        "kernel_address": "",
        "modules": [
          {
            "is_mutable": true,
            "address": "./rates",
            "name": "rates"
          }
        ]
      },
      "rates": {
        "kernel_address": "",
        "rates": [],
      },
      "tokens": {
        "kernel_address": "",
      },
      "publish-settings": {
      }
    }
  },
  {
    id: "crowdfund",
    adoType: "app-contract",
    name: "Crowdfund App",
    description:
      "Setup a crowdfund to distribute NFTs representing fractionalized ownership of the goal being funded. Proceeds are able to be divided and distributed to yield vaults to assure direct delivery to the respective manufacturing / distribution / business partnerships.",
    opts: ["Crowdfund", "CW721", "Vault", "Rates"],
    adoLimit: MAX_APP_LIMIT,
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTING.path,
        id: IImportantAdoKeys.PUBLISH_SETTING.key,
        required: true,
      },
      {
        "id": "tokens",
        "path": "cw721/latest/cw721",
        "required": true,
        "enabled": true,
        "pos": {
          "x": 1248,
          "y": 160
        }
      },
      {
        "id": "crowdfund",
        "path": "crowdfund/latest/crowdfund",
        "required": true,
        "enabled": true,
        "pos": {
          "x": 720,
          "y": 0
        }
      },
      {
        "id": "vault",
        "path": "vault/latest/vault",
        "required": false,
        "removable": true,
        "enabled": true,
        "pos": {
          "x": 720,
          "y": 384
        }
      }
    ],
    modules: [{ path: "vault/latest/vault" }],
    icon: "/app-templates/icons/crowdfund.png",
    installed: true,
    starter: true,
    formData: {
      "tokens": {
        "kernel_address": "",
        "minter": "./crowdfund"
      },
      "rates": {
        "kernel_address": "",
        "rates": []
      },
      "crowdfund": {
        "can_mint_after_sale": false,
        "kernel_address": "",
        "token_address": "./tokens"
      },
      "vault": {
        "kernel_address": ""
      },
      "publish-settings": {
      }
    }
  },
  {
    id: "cw20-exchange",
    adoType: "app-contract",
    name: "CW20 Exchange",
    icon: "/app-templates/icons/cw20-staking.png",
    description: "CW20 Exchange creates a unique digital asset to be sold on an independent exchange. Buyers can easily purchase CW20 tokens, for use in things like accessibility and liquidity. This simple and efficient exchange platform supports purchase options for both native and non-native tokens.",
    opts: ["CW20", "cw20 exchange"],
    adoLimit: MAX_APP_LIMIT,
    ados: [
      {
        path: IImportantAdoKeys.PUBLISH_SETTING.path,
        id: IImportantAdoKeys.PUBLISH_SETTING.key,
        required: true,
      },
      {
        "id": "tokens",
        "path": "cw20/latest/cw20",
        "required": true,
        "enabled": true,
        "pos": {
          "x": 0,
          "y": 350
        }
      },
      {
        "id": "exchange",
        "path": "cw20-exchange/latest/cw20-exchange",
        "required": true,
        "enabled": true,
        "pos": {
          "x": 528,
          "y": 352
        }
      }
    ],
    modules: [
      { path: "cw20/latest/cw20" },
      { path: "cw20-exchange/latest/cw20-exchange" },
    ],
    system: false,
    installed: true,
    starter: true,
    formData: {
      "tokens": {
        "initial_balances": [],
        "kernel_address": "",
        "marketing": null,
        "mint": null,
      },
      "exchange": {
        "kernel_address": "",
        "token_address": "./tokens"
      },
      "publish-settings": {
        "name": ""
      }
    },
  }
];

export default APP_TEMPLATES;
