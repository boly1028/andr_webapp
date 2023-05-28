import { useAndromedaContext } from "@/lib/andrjs";
import { useGetKeplrOnStart } from "@/lib/wallet";
import { useQuery } from "@tanstack/react-query";

export function useKeplrWalletChainConfigs() {
  const { keplr } = useGetKeplrOnStart()
  return useQuery(
    ["keplr", "wallet", keplr],
    () => {
      return keplr?.getChainInfosWithoutEndpoints()
    }
  );
}

export function useCurrentKeplrWalletChainConfig() {
  const { chainId } = useAndromedaContext()
  const { data: configs } = useKeplrWalletChainConfigs()
  return configs?.find(c => c.chainId === chainId)
}

