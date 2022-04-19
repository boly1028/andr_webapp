import { FlexBuilderTemplateProps } from "@/types";
export const TEMPLATES: Array<FlexBuilderTemplateProps> = [
  {
    id: "nft-collectible",
    name: "NFT Collectible",
    icon: "",
    description:
      "Create the most advanced and feature rich NFT Collectible in the world.",
    opts: ["Add royalties", "Black/White list", "Taxes", "Robust metadata"],
    schema: {
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: {
          type: "string",
          title: "First name",
          default: "Chuck",
        },
        lastName: {
          type: "string",
          title: "Last name",
        },
        telephone: {
          type: "string",
          title: "Telephone",
          minLength: 10,
        },
      },
    },
  },
  {
    id: "splitter-ado",
    name: "Splitter ADO",
    icon: "",
    description:
      "When funds are sent to this ADO, they will be split among specified address.",
    opts: ["Multi-Address Routing", "Whitelisting"],
  },
  {
    id: "timelock-ado",
    name: "Timelock ADO",
    icon: "",
    description:
      "An escrow styled ADO allowing users to lock funds until a specified time or block height.",
    opts: ["Hold till date", "Hold till block height", "Whitelisting"],
  },
  {
    id: "publish-token",
    name: "Publish Token",
    icon: "",
    description:
      "Some tempaltes are also designated for modifying pre-existing ADOs",
    opts: ["Shows a modifier panel"],
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
    disabled: true,
  },
  {
    id: "defi-instruments",
    name: "DeFi Instruments",
    icon: "",
    description: "Setup components for financial automation",
    opts: ["MIR", "ANC", "MIR & ANC", "(more in dev)"],
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
    disabled: true,
  },
];
