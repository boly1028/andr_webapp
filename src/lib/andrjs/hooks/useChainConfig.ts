import {
  queryAllChainConfigs,
  queryChainConfig,
} from "@andromedaprotocol/andromeda.js";
import { useQuery } from "@tanstack/react-query";

/**
 * Wrapper hook for the andr.js chain configs
 * @param chainId
 * @returns
 */
export function useChainConfig(
  chainId: string,
) {
  return useQuery(
    ["chain", chainId],
    () => {
      return queryChainConfig(chainId);
    }
  );
}

/**
 * Wrapper hook for the andr.js all chain configs
 * @returns
 */
export function useAllChainConfig(
) {
  return useQuery(
    ["chain"],
    () => {
      return queryAllChainConfigs().then(allConfigs => allConfigs.filter(config => !DISABLED_CHAIN_IDS.includes(config.chainId)));
    }
  );
}

const DISABLED_CHAIN_IDS: string[] = ['atlantic-1']
