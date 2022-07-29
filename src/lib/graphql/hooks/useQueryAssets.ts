import {
  QueryAssetsResponse,
  QueryAssets,
  QUERY_ASSETS,
} from "@andromedaprotocol/andromeda.js";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface QueryAssetsProps
  extends Pick<QueryResult, "loading" | "error"> {
  data?: QueryAssetsResponse["assets"];
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

  return {
    loading,
    error,
    data: data ? data.assets : undefined,
  };
}
