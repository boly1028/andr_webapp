import { v4 as uuidv4 } from "uuid";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";

export const TEMPLATES: Array<FlexBuilderTemplateProps> = [
  {
    id: "new",
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
      { path: "addresslist/0.1.0/addresslist" },
      { path: "rates/0.1.0/rates" },
      { path: "cw721-offers/0.1.0/cw721-offers" },
      { path: "receipt/0.1.0/receipt" },

      { path: "primitives/0.1.0/array" },
      { path: "primitives/0.1.0/boolean" },
      { path: "primitives/0.1.0/coin" },
      { path: "primitives/0.1.0/decimal" },
      { path: "primitives/0.1.0/string" },
      { path: "primitives/0.1.0/uint128" },

      { path: "anchor/0.1.0/anchor" },
      { path: "astroport/0.1.0/astroport" },
      { path: "auction/0.1.0/auction" },
      { path: "crowdfund/0.1.0/crowdfund" },
      { path: "cw20/0.1.0/cw20" },
      { path: "cw721/0.1.0/cw721" },
      { path: "lockdrop/0.1.0/lockdrop" },
      { path: "merkle-airdrop/0.1.0/merkle-airdrop" },
      { path: "mirror-wrapped-cdp/0.1.0/mirror_wrapped_cdp" },
      { path: "splitter/0.1.0/splitter" },
      { path: "swapper/0.1.0/swapper" },
      { path: "timelock/0.1.0/timelock" },
      { path: "vault/0.1.0/vault" },
      { path: "wrapped-cw721/0.1.0/wrapped_cw721" },
    ],
  },
  {
    id: "splitter",
    name: "Splitter",
    icon: "",
    description:
      "When funds are sent to this ADO, they will be split among specified address.",
    opts: [],
    ados: [
      { path: "ado-base/splitter", id: "splitter", required: true },
      // { path: "publish-settings", id: uuidv4() },
    ],
  },
  {
    id: "timelock",
    name: "Timelock",
    icon: "",
    description:
      "An escrow styled ADO allowing users to lock funds until a specified time or block height.",
    opts: [],
    ados: [
      { path: "ado-base/timelock", id: "timelock", required: true },
      // { path: "publish-settings", id: uuidv4() },
    ],
  },
  {
    id: "cw20-token",
    name: "CW20 Token",
    icon: "",
    description: "Create a CW20 Token for Your Project",
    opts: [],
    ados: [
      { path: "cw20/0.1.0/cw20", id: uuidv4(), required: true },
      // { path: "publish-settings", id: uuidv4() },
    ],
  },
  {
    id: "nft-collectible",
    name: "NFT Collectible",
    icon: "",
    description:
      "Create the most advanced and feature rich NFT Collectible in the world.",
    opts: [],
    ados: [
      { path: "ado-base/nft-collectible", id: uuidv4(), required: true },
      { path: "ado-module/whitelist", id: uuidv4() },
      { path: "ado-module/taxes", id: uuidv4() },
      { path: "ado-module/royalties", id: uuidv4() },
      { path: "receipt/0.1.0/receipt", id: uuidv4() },
      // { path: "publish-settings", id: uuidv4() },
    ],
  },
  {
    id: "address-list-ado",
    name: "Address List",
    icon: "",
    description:
      "An ADO which stores a queryable list of addresses which can be assigned to most other ADO address fields.",
    opts: [],
    ados: [
      { path: "ado-base/address-list", id: uuidv4(), required: true },
      // { path: "publish-settings", id: uuidv4() },
    ],
    disabled: false,
  },
  {
    id: "string-primitive",
    name: "String Primitive",
    icon: "",
    description:
      "Store a simple string value to reuse multiple times in your projects.",
    opts: [],
    ados: [
      { path: "primitives/0.1.0/string", id: uuidv4(), required: true },
      // { path: "publish-settings", id: uuidv4() },
    ],
    disabled: false,
  },
  {
    id: "integer-primitive",
    name: "Integer Primitive",
    icon: "",
    description:
      "Store a simple integer value to reuse multiple times in your projects.",
    opts: ["Unsigned 128bit Integer"],
    ados: [
      { path: "primitives/0.1.0/uint128", id: uuidv4(), required: true },
      // { path: "publish-settings", id: uuidv4() },
    ],
    disabled: false,
  },
  {
    id: "crowdfund",
    name: "Crowdfund",
    icon: "",
    description: "Start minting and selling tokens with a crowdfund.",
    opts: [],
    ados: [
      { path: "crowdfund/0.1.0/crowdfund", id: uuidv4(), required: true },
      { path: "crowdfund/0.1.0/andr_receive", id: uuidv4() },
      { path: "crowdfund/0.1.0/mint", id: uuidv4() },
      { path: "crowdfund/0.1.0/claim_refund", id: uuidv4() },
      { path: "crowdfund/0.1.0/purchase", id: uuidv4() },
      { path: "crowdfund/0.1.0/purchase_by_token_id", id: uuidv4() },
      { path: "crowdfund/0.1.0/end_sale", id: uuidv4() },
      { path: "crowdfund/0.1.0/start_sale", id: uuidv4() },
    ],
  },

  {
    id: "vault",
    name: "Vault",
    icon: "",
    description:
      "Deposit funds to a vault and allow them to be proxied to various yield strategies.",
    opts: [],
    ados: [
      { path: "vault/0.1.0/vault", id: uuidv4(), required: true },
      { path: "vault/0.1.0/andr_receive", id: uuidv4() },
      { path: "vault/0.1.0/update_strategy", id: uuidv4() },
      { path: "vault/0.1.0/withdraw", id: uuidv4() },
      { path: "vault/0.1.0/deposit", id: uuidv4() },
    ],
  },
  // {
  //   id: "panel-inventory",
  //   name: "Complete Panel Inventory for Review",
  //   icon: "",
  //   description: "Shows all panels for ",
  //   opts: ["ADOs", "Modules", "Classifiers"],
  //   ados: [
  //     { path: "ado-base/address-list", id: uuidv4() },
  //     { path: "ado-base/nft-collectible", id: uuidv4() },
  //     { path: "ado-base/splitter", id: uuidv4() },
  //     { path: "ado-base/timelock", id: uuidv4() },
  //     { path: "ado-module/whitelist", id: uuidv4() },
  //     { path: "ado-module/blacklist", id: uuidv4() },
  //     { path: "cw20/0.1.0/cw20", id: uuidv4() },
  //     { path: "cw20/0.1.0/transfer", id: uuidv4() },
  //     { path: "cw20/0.1.0/transfer-from", id: uuidv4() },
  //     { path: "cw20/0.1.0/burn", id: uuidv4() },
  //     { path: "cw20/0.1.0/burn-from", id: uuidv4() },
  //     { path: "cw20/0.1.0/mint", id: uuidv4() },
  //     { path: "cw20/0.1.0/send", id: uuidv4() },
  //     { path: "cw20/0.1.0/increase-allowance", id: uuidv4() },
  //     { path: "cw20/0.1.0/decrease-allowance", id: uuidv4() },
  //     { path: "cw20/0.1.0/update-marketing", id: uuidv4() },
  //     { path: "ado-module/taxes", id: uuidv4() },
  //     { path: "ado-module/royalties", id: uuidv4() },
  //     { path: "ado-modifier/add-address", id: uuidv4() },
  //     { path: "ado-modifier/metadata", id: uuidv4() },
  //     { path: "ado-modifier/mint", id: uuidv4() },
  //     { path: "ado-modifier/remove-address", id: uuidv4() },
  //     { path: "ado-modifier/transfer-nft-collectible", id: uuidv4() },
  //     { path: "ado-modifier/update-lock", id: uuidv4() },
  //     { path: "ado-modifier/update-owner", id: uuidv4() },
  //     { path: "ado-modifier/update-pricing", id: uuidv4() },
  //     { path: "ado-modifier/update-recipients", id: uuidv4() },
  //   ],
  // },

  // {
  //   id: "new-panel-inventory",
  //   name: "New Panel Inventory",
  //   icon: "",
  //   description: "Shows all new panels for ",
  //   opts: ["ADOs", "Modules", "Classifiers"],
  //   ados: [
  //     { path: "receipt/0.1.0/receipt", id: uuidv4() },
  //     { path: "receipt/0.1.0/store-receipt", id: uuidv4() },
  //     { path: "receipt/0.1.0/edit-receipt", id: uuidv4() },
  //     { path: "primitives/0.1.0/set-value", id: uuidv4() },
  //     { path: "primitives/0.1.0/uint128", id: uuidv4() },
  //     { path: "primitives/0.1.0/decimal", id: uuidv4() },
  //     { path: "primitives/0.1.0/coin", id: uuidv4() },
  //     { path: "primitives/0.1.0/string", id: uuidv4() },
  //     { path: "primitives/0.1.0/boolean", id: uuidv4() },
  //     { path: "primitives/0.1.0/array", id: uuidv4() },
  //     { path: "primitives/0.1.0/delete-value", id: uuidv4() },
  //     { path: "cw721-offers/0.1.0/cw721-offers", id: uuidv4() },
  //     { path: "cw721-offers/0.1.0/place-offer", id: uuidv4() },
  //     { path: "cw721-offers/0.1.0/accept-offer", id: uuidv4() },
  //     { path: "cw721-offers/0.1.0/cancel-offer", id: uuidv4() },
  //   ],
  // },

  // {
  //   id: "auction",
  //   name: "Auction",
  //   icon: "",
  //   description: "Auction",
  //   opts: [],
  //   ados: [
  //     { path: "auction/0.1.0/cancel_auction", id: uuidv4() },
  //     { path: "auction/0.1.0/receive_nft", id: uuidv4() },
  //     { path: "auction/0.1.0/claim", id: uuidv4() },
  //     { path: "auction/0.1.0/update_auction", id: uuidv4() },

  //     { path: "auction/0.1.0/place_bid", id: uuidv4() },
  //     { path: "auction/0.1.0/update_owner", id: uuidv4() },
  //   ],
  // },

  // {
  //   id: "owm-template",
  //   name: "Load Your Own Template",
  //   icon: "",
  //   description:
  //     "Load your own flex template to launch or relaunch a previous build including entered data!",
  //   opts: [
  //     "Save your progress",
  //     "Collaborate with a team",
  //     "Use other's templates",
  //     "Pre-entered data supported",
  //   ],
  //   ados: [],
  //   disabled: true,
  // },
  {
    id: "defi-instruments",
    name: "DeFi Instruments",
    icon: "",
    description: "Setup components for financial automation",
    opts: ["MIR", "ANC", "MIR & ANC", "(more in dev)"],
    ados: [],
    disabled: true,
  },
  {
    id: "generic-ado",
    name: "Generic ADO",
    icon: "",
    description: "Define simple data values to be utilized in other ADOs",
    opts: [
      "Storage",
      "Specific values",
      "Primitive functions",
      "(more in dev)",
    ],
    ados: [],
    disabled: true,
  },

  // Section removed as it needs to be loaded into a seperate execute message based action handler
  // {
  //   id: "mint",
  //   name: "Mint an NFT Collectible",
  //   icon: "",
  //   description: "Ignore: Temporary Proof on Call Structure",
  //   opts: [],
  //   ados: [{ path: "ado-modifier/mint", id: uuidv4(), required: true }],
  //   disabled: true,
  // },
];
