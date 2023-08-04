import { useTxByContractQuery } from "@andromedaprotocol/gql/dist/react";


export function useQueryTxByAddress(address: string, chainId: string, minHeight?: number, maxHeight?: number) {
  const { data, loading, error } = useTxByContractQuery({
    variables: {
      contractAddress: address,
      chainId,
      maxHeight,
      minHeight
    }
  })
  return {
    loading,
    error,
    data: data?.tx.byContract
  }
}