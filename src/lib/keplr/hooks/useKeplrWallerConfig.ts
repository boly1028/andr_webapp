import { useAndromedaStore } from "@/zustand/andromeda";
import { useQuery } from "@tanstack/react-query";

export function useKeplrWalletChainConfigs() {
  const keplr = useAndromedaStore(state => state.keplr)
  return useQuery(
    ["keplr", "wallet", keplr],
    () => {
      return keplr?.getChainInfosWithoutEndpoints()
    }
  );
}

export function useCurrentKeplrWalletChainConfig() {
  const chainId = useAndromedaStore(state => state.chainId)
  const { data: configs } = useKeplrWalletChainConfigs()
  return configs?.find(c => c.chainId === chainId)
}

