import { QueryResult, useQuery, gql } from "@apollo/client";

interface Query {
    contractAddress: string;
}
interface QueryResponse {
    ADO: {
        app: {
            config: {
                name: string;
                owner: string;
            },
            address: string;
        }
    }
}

export interface ReturnValue
    extends Pick<QueryResult, "loading" | "error"> {
    data?: QueryResponse['ADO']['app'];
}

export function useAppConfig(address: string, skip = false): ReturnValue {
    const { data, loading, error } = useQuery<QueryResponse, Query>(
        gql`
        query APP_CONFIG($contractAddress: String!) {
            ADO{
                app(address: $contractAddress) {
                    config {
                        name,
                        owner,
                    },
                    address
                }
            }
          }
        `,
        { variables: { 'contractAddress': address }, skip: skip },
    );
    return {
        loading,
        error,
        data: data?.ADO.app
    }
}