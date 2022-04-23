interface SchemaPanel {
  id: string;
  type: SchemaPanelType | string;
  open?: boolean;
  required?: boolean;
  enabled?: boolean;
  removable?: boolean;
  data?: any;
}

type SchemaPanelType =
  | "address-list"
  | "add-address"
  | "blacklist"
  | "cw20"
  | "transfer"
  | "burn"
  | "metadata"
  | "mint"
  | "nft-collectible"
  | "royalties"
  | "remove-address"
  | "splitter"
  | "taxes"
  | "timelock"
  | "transfer-nft-collectible"
  | "update-lock"
  | "update-owner"
  | "update-pricing"
  | "update-recipients"
  | "whitelist";
