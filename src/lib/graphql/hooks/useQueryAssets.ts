import { IAdoType, IAndrOrderBy, useAssetsQuery } from "@andromedaprotocol/gql/dist/react";

export interface FilterObjectType {
  adoType?: IAdoType;
  orderBy?: IAndrOrderBy;
  search?: string;
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
) {
  const { loading, data, error, fetchMore, previousData, refetch, variables } = useAssetsQuery(
    {
      variables: { walletAddress, limit, offset, orderBy: filters.orderBy || IAndrOrderBy.DESC, adoType: filters.adoType || undefined, search: filters.search },
      notifyOnNetworkStatusChange: true,
      'nextFetchPolicy': 'cache-first',
      'fetchPolicy':'cache-and-network'
    },
  );

  console.log(data?.accounts?.assets, variables);
  // Converting assets to any and then to array to get proper typing at the end. It should be removed once type has been fixed in the library

  return {
    loading,
    error,
    data: data?.accounts.assets,
    fetchMore,
    previousData,
    refetch
  };
}
