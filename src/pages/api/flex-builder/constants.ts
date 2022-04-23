import { v4 as uuidv4 } from "uuid";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";

export const TEMPLATES: Array<FlexBuilderTemplateProps> = [
  {
    id: "nft-collectible",
    name: "NFT Collectible",
    icon: "",
    description:
      "Create the most advanced and feature rich NFT Collectible in the world.",
    opts: ["Add royalties", "Black/White list", "Taxes", "Robust metadata"],
    ados: [
      { path: "ado-base/nft-collectible", id: uuidv4(), required: true },
      { path: "ado-module/whitelist", id: uuidv4() },
      { path: "ado-module/taxes", id: uuidv4() },
      { path: "ado-module/royalties", id: uuidv4() },
    ],
  },
  {
    id: "splitter-ado",
    name: "Splitter ADO",
    icon: "",
    description:
      "When funds are sent to this ADO, they will be split among specified address.",
    opts: ["Multi-Address Routing", "Whitelisting"],
    ados: [
      { path: "ado-base/splitter", id: uuidv4(), required: true },
      { path: "ado-module/whitelist", id: uuidv4() },
    ],
  },
  {
    id: "timelock-ado",
    name: "Timelock ADO",
    icon: "",
    description:
      "An escrow styled ADO allowing users to lock funds until a specified time or block height.",
    opts: ["Hold till date", "Hold till block height", "Whitelisting"],
    ados: [
      { path: "ado-base/timelock", id: uuidv4(), required: true },
      { path: "ado-module/whitelist", id: uuidv4() },
    ],
  },
  {
    id: "publish-token",
    name: "Publish Token",
    icon: "",
    description:
      "Some templates are also designated for modifying pre-existing ADOs",
    opts: ["Shows a modifier panel"],
    ados: [{ path: "cw20/cw20", id: uuidv4(), required: true }],
  },
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
    ados: [],
  },
  {
    id: "address-list-ado",
    name: "Address List ADO",
    icon: "",
    description:
      "An ADO which stores a queryable list of addresses. Which can be assigned to most other ADO address fields.",
    opts: [
      "Assignable to Whitelists",
      "Assignable to Blacklists",
      "Assignable to Splitters",
      "Assignable to Timelocks",
    ],
    ados: [],
    disabled: true,
  },
  {
    id: "owm-template",
    name: "Load Your Own Template",
    icon: "",
    description:
      "Load your own flex template to launch or relaunch a previous build including entered data!",
    opts: [
      "Save your progress",
      "Collaborate with a team",
      "Use other's templates",
      "Pre-entered data supported",
    ],
    ados: [],
    disabled: true,
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
  {
    id: "panel-inventory",
    name: "Complete Panel Inventory for Review",
    icon: "",
    description: "Shows all panels for ",
    opts: ["ADOs", "Modules", "Classifiers"],
    ados: [
      { path: "ado-base/address-list", id: uuidv4() },
      { path: "ado-base/nft-collectible", id: uuidv4() },
      { path: "ado-base/splitter", id: uuidv4() },
      { path: "ado-base/timelock", id: uuidv4() },
      { path: "ado-module/whitelist", id: uuidv4() },
      { path: "ado-module/blacklist", id: uuidv4() },
      { path: "cw20/cw20", id: uuidv4() },
      { path: "ado-module/taxes", id: uuidv4() },
      { path: "ado-module/royalties", id: uuidv4() },
      { path: "ado-modifier/add-address", id: uuidv4() },
      { path: "ado-modifier/metadata", id: uuidv4() },
      { path: "ado-modifier/mint", id: uuidv4() },
      { path: "ado-modifier/remove-address", id: uuidv4() },
      { path: "ado-modifier/transfer-nft-collectible", id: uuidv4() },
      { path: "ado-modifier/update-lock", id: uuidv4() },
      { path: "ado-modifier/update-owner", id: uuidv4() },
      { path: "ado-modifier/update-pricing", id: uuidv4() },
      { path: "ado-modifier/update-recipients", id: uuidv4() },
    ],
    disabled: false,
  },
];
