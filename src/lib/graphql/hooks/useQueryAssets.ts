import {
  QueryAssetsResponse,
  QueryAssets,
} from "@andromedaprotocol/andromeda.js";
import { gql, QueryResult, useQuery } from "@apollo/client";
export interface QueryAssetsProps
  extends Pick<QueryResult<QueryAssetsResponse, QueryAssets>, "loading" | "error" | "fetchMore" | "previousData" | "refetch"> {
  // Type should be array itself. Make an interface for asset and using Asset[] as response. Changes needed in the library
  data?: QueryAssetsResponse["assets"];
}
export interface FilterObjectType {
  search?: string | undefined | null;
  adoType?: string | undefined | null;
  orderBy?: string | undefined | null;
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
  filterObj?: FilterObjectType

): QueryAssetsProps {  
  let assetsQuery = `assets(walletAddress: $walletAddress, limit: $limit, offset: $offset`;
  if (filterObj?.search) {
    assetsQuery += `,search: "${filterObj.search}"`;
  }
  if (filterObj?.adoType) {
    assetsQuery += `,adoType: ${filterObj.adoType}`;
  }
  if (filterObj?.orderBy) {
    assetsQuery += `,orderBy: ${filterObj.orderBy}`;
  }
  assetsQuery += '){';

  const { loading, data, error, fetchMore, previousData, refetch } = useQuery<QueryAssetsResponse, QueryAssets>(
    gql`
    query QUERY_ASSETS(
      $walletAddress: String!,
      $limit: Int!,
      $offset: Int!
      ) {
        ${assetsQuery}
            address 
            adoType
            appContract 
            chainId 
            instantiateHash 
            instantiateHeight 
            lastUpdatedHash 
            lastUpdatedHeight
            owner
            name
        }
      }
    `,
    { variables: { walletAddress, limit, offset }, notifyOnNetworkStatusChange: true },
  );

  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.assets,
    fetchMore,
    previousData,
    refetch
  };
}
