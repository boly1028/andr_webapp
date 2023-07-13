import {
  QueryAssetsResponse,
  QueryAssets,
} from "@andromedaprotocol/andromeda.js";
import { gql, QueryResult, useQuery } from "@apollo/client";
import { AssetSortAdoType } from "./assets/ado.enum";

export interface FilterObjectType {
  adoType?: AssetSortAdoType;
  orderBy?: 'Asc' | 'Desc';
  search?: string;
}

export type QueryRequest = (QueryAssets & FilterObjectType)
export interface QueryAssetsProps
  extends Pick<QueryResult<QueryAssetsResponse, QueryAssets>, "loading" | "error" | "fetchMore" | "previousData" | "refetch"> {
  // Type should be array itself. Make an interface for asset and using Asset[] as response. Changes needed in the library
  data?: (QueryAssetsResponse["assets"][0] & { name?: string })[];
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
  filters: FilterObjectType

): QueryAssetsProps {
  const { loading, data, error, fetchMore, previousData, refetch } = useQuery<QueryAssetsResponse, QueryRequest>(
    gql`
    query QUERY_ASSETS(
      $walletAddress: String!,
      $limit: Int!,
      $offset: Int!,
      $search:String,
      $adoType:AdoType,
      $orderBy:AndrOrderBy
      ) {
        assets(walletAddress: $walletAddress, limit: $limit, offset: $offset, search:$search, adoType:$adoType, orderBy:$orderBy){
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
    { variables: { walletAddress, limit, offset, orderBy: filters.orderBy || 'Desc', adoType: filters.adoType || undefined, search: filters.search }, notifyOnNetworkStatusChange: true },
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
