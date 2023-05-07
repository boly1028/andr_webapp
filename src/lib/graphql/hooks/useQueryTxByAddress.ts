import { QueryResult, useQuery, gql } from "@apollo/client";

interface Query {
  contractAddress: string;
  chainId: string;
  minHeight?: number;
  maxHeight?: number;
}
interface QueryResponse {
  tx: {
    byContract: {
      code?: number
      events: TxEvent[]
      gasUsed?: number
      gasWanted?: number
      hash: string
      height: number
      rawLog?: string
      tx: JSON
      txLog: {
        events: TxEvent[]
      }[]
    }[]
  }
}

interface TxEvent {
  type: string;
  attributes: {
    key: string;
    value: string;
  }[]
}

export interface ReturnValue
  extends Pick<QueryResult, "loading" | "error"> {
  data?: QueryResponse['tx']['byContract'];
}

export function useQueryTxByAddress(address: string, chainId: string, minHeight?: number, maxHeight?: number): ReturnValue {
  const { data, loading, error } = useQuery<QueryResponse, Query>(
    gql`
      query TX_BY_CONTRACT(
          $chainId: String!
          $contractAddress: String!
          $minHeight: Int
          $maxHeight: Int
        ) {
          tx(chainId: $chainId) {
            byContract(
              address: $contractAddress
              minHeight: $minHeight
              maxHeight: $maxHeight
            ) {
              code
              events {
                type
                attributes {
                  key
                  value
                }
              }
              gasUsed
              gasWanted
              hash
              height
              rawLog
              tx
              txLog {
                events {
                  type
                  attributes {
                    key
                    value
                  }
                }
              }
            }
          }
        }    
      `,
    { variables: { 'contractAddress': address, chainId, minHeight, maxHeight } },
  );
  return {
    loading,
    error,
    data: data?.tx.byContract
  }
}