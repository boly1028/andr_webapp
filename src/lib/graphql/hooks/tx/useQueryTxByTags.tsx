import { QueryResult, useQuery, gql } from "@apollo/client";

export interface TAG {
    key: string;
    value: any;
}
interface Query {
    tags: TAG[];
    chainId: string;
    minHeight?: number;
    maxHeight?: number;
}
interface QueryResponse {
    tx: {
        byTag: {
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
    data?: QueryResponse['tx']['byTag'];
}

export function useQueryTxByTags(tags: TAG[], chainId: string, minHeight?: number, maxHeight?: number): ReturnValue {
    const { data, loading, error } = useQuery<QueryResponse, Query>(
        gql`
      query TX_BY_TAG(
          $chainId: String!
          $tags: JSON!
          $minHeight: Int
          $maxHeight: Int
        ) {
          tx(chainId: $chainId) {
            byTag(
              tags: $tags
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
        { variables: { 'tags': tags, chainId, minHeight, maxHeight } },
    );
    return {
        loading,
        error,
        data: data?.tx.byTag
    }
}