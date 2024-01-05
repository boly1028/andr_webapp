import { useTxByContractQuery } from "@andromedaprotocol/gql/dist/__generated/react";


export function useQueryTxByAddress(address: string, chainId: string, minHeight?: number, maxHeight?: number) {
  const { data, loading, error } = useTxByContractQuery({
    variables: {
      contractAddress: address,
      chainId,
      maxHeight,
      minHeight
    }
  })
  console.log(data, error, "TX_QUERY_DEBUG")
  return {
    loading,
    error,
    data: data?.tx.byContract
  }
}