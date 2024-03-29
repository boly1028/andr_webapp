import { useAppConfigQuery } from "@andromedaprotocol/gql/dist/__generated/react"

export function useAppConfig(address: string, skip = false) {
    const { data, loading, error } = useAppConfigQuery(
        { variables: { 'contractAddress': address }, skip: skip },
    );
    return {
        loading,
        error,
        data: data?.ADO.app
    }
}