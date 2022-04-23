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
  | "add-address"
  | "blacklist"
  | "metadata"
  | "mint"
  | "nft-collectible"
  | "royalties"
  | "splitter"
  | "taxes"
  | "timelock"
  | "transfer-nft-collectible"
  | "update-lock"
  | "update-owner"
  | "update-pricing"
  | "update-recipients"
  | "whitelist";
