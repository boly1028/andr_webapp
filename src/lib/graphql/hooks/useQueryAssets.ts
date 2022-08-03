import {
  QueryAssetsResponse,
  QueryAssets,
  QUERY_ASSETS,
} from "@andromedaprotocol/andromeda.js";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface QueryAssetsProps
  extends Pick<QueryResult, "loading" | "error"> {
  // Type should be array itself. Make an interface for asset and using Asset[] as response. Changes needed in the library
  data?: QueryAssetsResponse["assets"][];
}

/**
 * Queries all ADOs, their type and their contract addresses for a given wallet
 * @param walletAddress
 * @returns
 */
export default function useQueryAssets(
  walletAddress: string,
): QueryAssetsProps {
  const { loading, data, error } = useQuery<QueryAssetsResponse, QueryAssets>(
    gql`
      ${QUERY_ASSETS}
    `,
    { variables: { walletAddress } },
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library
  const assets = data?.assets ?? [] as any;

  return {
    loading,
    error,
    data: assets,
  };
}
