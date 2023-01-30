import {
  ChainConfig,
  QueryTxByContract as Query,
  QueryTxByContractResponse as QueryResponse,
  QUERY_TX_BY_CONTRACT as QueryText,
  TxInfo,
} from "@andromedaprotocol/andromeda.js";
import { QueryResult, useQuery, gql } from "@apollo/client";

export interface QueryProps
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
  contractAddress: string,
  chainId: ChainConfig['chainId'],
  maxHeight?: number,
  minHeight?: number,
): QueryProps {
  const { loading, data, error } = useQuery<
    QueryResponse,
    Query
  >(
    gql`
      ${QueryText}
    `,
    { variables: { contractAddress, minHeight, maxHeight, chainId } },
  );

  return {
    loading,
    error,
    data: data ? data.tx.byContract : [],
  };
}
