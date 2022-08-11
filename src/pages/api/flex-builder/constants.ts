import { v4 as uuidv4 } from "uuid";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";

export const TEMPLATES: Array<FlexBuilderTemplateProps> = [
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
      { path: "address-list/0.1.0/address-list" },
      { path: "primitives/0.1.0/array" },
      { path: "auction/0.1.0/auction" },
      { path: "primitives/0.1.0/boolean" },
      { path: "primitives/0.1.0/coin" },
      { path: "crowdfund/0.1.0/crowdfund" },
      { path: "cw20/0.1.0/cw20" },
      { path: "cw20-staking/0.1.0/cw20-staking" },
      { path: "cw721/0.1.0/cw721" },
      { path: "cw721-offers/0.1.0/cw721-offers" },
      { path: "cw721-staking/0.1.0/cw721-staking" },
      { path: "primitives/0.1.0/decimal" },
      { path: "gumball/0.1.0/gumball" },
      { path: "lockdrop/0.1.0/lockdrop" },
      { path: "merkle-airdrop/0.1.0/merkle-airdrop" },
      { path: "primitives/0.1.0/string" },
      { path: "nft-timelock/0.1.0/nft-timelock" },

      { path: "rates/0.1.0/rates" },
      { path: "rate-limiting-withdrawals/0.1.0/rate-limiting-withdrawals" },
      { path: "receipt/0.1.0/receipt" },
      { path: "splitter/0.1.0/splitter" },
      { path: "timelock/0.1.0/timelock" },
      { path: "primitives/0.1.0/uint128" },
      { path: "vault/0.1.0/vault" },
      { path: "vesting/0.1.0/vesting" },
      {
        path: "weighted-distribution-splitter/0.1.0/weighted-distribution-splitter",
      },
      { path: "wrapped-cw721/0.1.0/wrapped-cw721" },
    ],
  },
  {
    id: "crowdfunding",
    name: "Crowdfunding App",
    icon: "",
    description: "Setup a crowdfunding sale.",
    opts: ["CW721 Token", "Crowdfund", "2 Vaults", "Splitter"],
    ados: [
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "cw721/0.1.0/cw721", id: "tokens", required: true },
      { path: "crowdfund/0.1.0/crowdfund", id: "crowdfund", required: true },
      { path: "vault/0.1.0/vault", id: "yield_valut", required: true },
      { path: "vault/0.1.0/vault", id: "reserve_valut", required: true },
      { path: "splitter/0.1.0/splitter", id: "sale_splitter", required: true },
    ],
  },
  {
    id: "auctioning",
    name: "Auctioning App",
    icon: "",
    description: "Setup an auctioning app.",
    opts: ["CW20 Token", "Staking"],
    ados: [
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "cw20/0.1.0/cw20", id: "cw20", required: true },
      {
        path: "cw20-staking/0.1.0/cw20-staking",
        id: "staking",
        required: true,
      },
    ],
  },
  {
    id: "Staking",
    name: "CW20 Staking App",
    icon: "",
    description: "Setup a CW20 staking app.",
    opts: ["CW721 Token", "Auction"],
    ados: [
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "cw721/0.1.0/cw721", id: "tokens", required: true },
      { path: "auction/0.1.0/auction", id: "auction", required: true },
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
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "splitter/0.1.0/splitter", id: uuidv4(), required: true },
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
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "timelock/0.1.0/timelock", id: uuidv4(), required: true },
    ],
  },
  {
    id: "cw20-token",
    name: "CW20 Token",
    icon: "",
    description: "Create a CW20 Token for Your Project",
    opts: [],
    ados: [
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "cw20/0.1.0/cw20", id: uuidv4(), required: true },
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
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "cw721/0.1.0/cw721", id: uuidv4(), required: true },
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
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "address-list/0.1.0/address-list", id: uuidv4(), required: true },
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
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "primitives/0.1.0/string", id: uuidv4(), required: true },
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
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "primitives/0.1.0/uint128", id: uuidv4(), required: true },
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
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "crowdfund/0.1.0/crowdfund", id: uuidv4(), required: true },
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
      { path: "publish-settings", id: "publish-settings", required: true },
      { path: "vault/0.1.0/vault", id: uuidv4(), required: true },
    ],
  },
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
];
