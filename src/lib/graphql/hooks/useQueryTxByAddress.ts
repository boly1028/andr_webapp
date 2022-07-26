import { tx } from "@andromedaprotocol/andromeda.js/dist/andr-js/hubble/queries/index";
import { QueryResult, useQuery, gql } from "@apollo/client";

export interface QueryTxByAddressProps
  extends Pick<QueryResult, "loading" | "error"> {
  data: tx.TxInfo[];
}

/**
 * Queries all transactions for a given address, can be filtered to only include transactions between two block heights
 * @param address
 * @param maxHeight
 * @param minHeight
 * @returns
 */
export default function useQueryTxByAddress(
  address: string,
  maxHeight?: number,
  minHeight?: number,
): QueryTxByAddressProps {
  const { loading, data, error } = useQuery<
    tx.QueryTxByAccountResponse,
    tx.QueryTxByAccount
  >(
    gql`
      ${tx.QUERY_TX_BY_ACCOUNT}
    `,
    { variables: { address, minHeight, maxHeight } },
  );

  return {
    loading,
    error,
    data: data ? data.tx.byAccount : [],
  };
}
