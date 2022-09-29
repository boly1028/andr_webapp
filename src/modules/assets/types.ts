import { QueryAssetsResponse } from "@andromedaprotocol/andromeda.js";

export interface NftAsset {
  id: number;
  image: string;
  name: string;
  slug: string;
  type: string;
  chain: string;
}

/** Combine interface for query from graphql and data from ADOP JSON */
export type AdoAsset = QueryAssetsResponse['assets'][number] & {
  // Data from ADOP JSON
  // $class: string;
  // $classifier: string[];
  // modifiers: string[];
}
