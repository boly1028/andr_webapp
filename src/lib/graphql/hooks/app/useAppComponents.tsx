import { useAppComponentsQuery } from "@andromedaprotocol/gql/dist/react"

export function useAppComponents(address: string) {
    const { data, loading, error } = useAppComponentsQuery(
        { variables: { 'contractAddress': address } },
    );
    return {
        loading,
        error,
        data: data?.ADO.app
    }
}