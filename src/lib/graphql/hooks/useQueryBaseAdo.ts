import { useBaseAdoQuery } from '@andromedaprotocol/gql/dist/react'

export function useQueryBaseAdo(address: string) {
  const { data, loading, error } = useBaseAdoQuery({
    variables: {
      contractAddress: address,
    }
  })
  return {
    loading,
    error,
    data: data?.ADO?.ado
  }
}