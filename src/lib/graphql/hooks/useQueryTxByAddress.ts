import {
  ChainConfig,
  QueryTxByAccount,
  QueryTxByAccountResponse,
  QUERY_TX_BY_ACCOUNT,
  TxInfo,
} from "@andromedaprotocol/andromeda.js";
import { QueryResult, useQuery, gql } from "@apollo/client";

export interface QueryTxByAddressProps
  extends Pick<QueryResult, "loading" | "error"> {
  data: TxInfo[];
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
  chainId: ChainConfig['chainId'],
  maxHeight?: number,
  minHeight?: number,
): QueryTxByAddressProps {
  const { loading, data, error } = useQuery<
    QueryTxByAccountResponse,
    QueryTxByAccount
  >(
    gql`
      ${QUERY_TX_BY_ACCOUNT}
    `,
    { variables: { address, minHeight, maxHeight, chainId } },
  );

  return {
    loading,
    error,
    data: data ? data.tx.byAccount : [],
  };
}
