export interface NftAsset {
  id: number;
  image: string;
  name: string;
  slug: string;
  type: string;
  chain: string;
}

export interface AdoAsset {
  //Data from graphQL
  name: string;
  type: string;
  version: string;
  lastActivity: string;
  created: string;

  // Data from ADOP JSON
  $class: string;
  $classifier: string[];
  modifiers: string[];
}
