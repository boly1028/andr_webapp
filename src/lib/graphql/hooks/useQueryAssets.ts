import { tx } from "@andromedaprotocol/andromeda.js/dist/andr-js/hubble/queries/index";
import { gql, QueryResult, useQuery } from "@apollo/client";

export interface QueryAssetsProps
  extends Pick<QueryResult, "loading" | "error"> {
  data?: tx.QueryAssetsResponse["assets"];
}

/**
 * Queries all ADOs, their type and their contract addresses for a given wallet
 * @param walletAddress
 * @returns
 */
export default function useQueryAssets(
  walletAddress: string,
): QueryAssetsProps {
  const { loading, data, error } = useQuery<
    tx.QueryAssetsResponse,
    tx.QueryAssets
  >(
    gql`
      ${tx.QUERY_ASSETS}
    `,
    { variables: { walletAddress } },
  );

  return {
    loading,
    error,
    data: data ? data.assets : undefined,
  };
}
