import { QueryResult, useQuery, gql } from "@apollo/client";

interface Query {
  contractAddress: string;
}
interface QueryResponse {
  ADO: {
    ado: {
      andr: {
        address: string;
        admin?: string
        blockHeightUponCreation: number
        codeId: number
        creator: string
        ibcPortId?: string
        label: string
        operators: string[]
        originalPublisher: string
        owner: string
        queries_expected: string[]
        type: string
        version: string
      }
      address: string;
      type: string;
    }
  }
}

export interface ReturnValue
  extends Pick<QueryResult, "loading" | "error"> {
  data?: QueryResponse['ADO']['ado'];
}

const BASE_ADO_QUERY = gql`
query BASE_ADO($contractAddress: String!) {
    ADO{
        ado(address: $contractAddress) {
          address
          type
          andr {
            address
            admin
            blockHeightUponCreation
            codeId
            creator
            ibcPortId
            label
            operators
            originalPublisher
            owner
            queries_expected
            type
            version
          }
        }
    }
  }
`

export function useQueryBaseAdo(address: string): ReturnValue {
  const { data, loading, error } = useQuery<QueryResponse, Query>(
    BASE_ADO_QUERY,
    { variables: { 'contractAddress': address } },
  );
  return {
    loading,
    error,
    data: data?.ADO.ado
  }
}