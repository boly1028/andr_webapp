import { useGetKeplrOnStart } from "@/lib/wallet";
import {
  queryKeplrConfig,
} from "@andromedaprotocol/andromeda.js";
import { useQuery } from "@tanstack/react-query";
import useAndromedaContext from "./useAndromedaContext";

/**
 * Wrapper hook for the andr.js keplr chain configs
 * @param chainId
 * @returns
 */
export function useChainConfig(
  chainId: string,
) {
  return useQuery(
    ["chain", "keplr", chainId],
    () => {
      return queryKeplrConfig(chainId);
    }
  );
}

export function useKeplrWalletChainConfigs() {
  const { keplr } = useGetKeplrOnStart()
  return useQuery(
    ["keplr", "wallet", keplr],
    () => {
      return keplr?.getChainInfosWithoutEndpoints()
    }
  );
}

export function useCurrentChainConfig() {
  const { chainId } = useAndromedaContext()
  const { data: configs } = useKeplrWalletChainConfigs()
  return configs?.find(c => c.chainId === chainId)
}

