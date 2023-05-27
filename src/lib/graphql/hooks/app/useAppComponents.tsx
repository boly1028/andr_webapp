import { QueryResult, useQuery, gql } from "@apollo/client";

interface Query {
    contractAddress: string;
}
interface QueryResponse {
    ADO: {
        app: {
            components: {
                name: string;
                address: string;
                ado_type: string;
                instantiate_msg: string;
            }[];
            address: string;
        }
    }
}

export interface ReturnValue
    extends Pick<QueryResult, "loading" | "error"> {
    data?: QueryResponse['ADO']['app'];
}

export function useAppComponents(address: string): ReturnValue {
    const { data, loading, error } = useQuery<QueryResponse, Query>(
        gql`
        query APP_COMPONENTS($contractAddress: String!) {
            ADO{
                app(address: $contractAddress) {
                    components{
                        name,
                        address,
                        ado_type,
                        instantiate_msg,
                      },
                      address
                }
            }
          }
        `,
        { variables: { 'contractAddress': address } },
    );
    return {
        loading,
        error,
        data: data?.ADO.app
    }
}