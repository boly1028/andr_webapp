import {
  QueryAssetsResponse,
  QueryAssets,
  QUERY_ASSETS,
} from "@andromedaprotocol/andromeda.js";
import { gql, QueryResult, useQuery } from "@apollo/client";
import { useMemo } from "react";

export interface QueryAssetsProps
  extends Pick<QueryResult<QueryAssetsResponse, QueryAssets>, "loading" | "error" | "refetch"> {
  // Type should be array itself. Make an interface for asset and using Asset[] as response. Changes needed in the library
  data?: QueryAssetsResponse["assets"][];
  prevData?: QueryAssetsResponse["assets"][];
}

/**
 * Queries all ADOs, their type and their contract addresses for a given wallet
 * @param walletAddress
 * @returns
 */
export default function useQueryAssets(
  walletAddress: string,
  limit: number,
  offset: number,
): QueryAssetsProps {
  const { loading, data, error, previousData, refetch } = useQuery<QueryAssetsResponse, QueryAssets>(
    gql`
      ${QUERY_ASSETS}
    `,
    { variables: { walletAddress, limit, offset } },
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library
  const assets = data?.assets ?? ([] as any);
  const prevAssets = previousData?.assets ?? ([] as any)

  return {
    loading,
    error,
    data: assets,
    prevData: prevAssets,
    refetch
  };
}
