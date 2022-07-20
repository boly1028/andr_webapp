import {
  ChainConfig,
  getConfigByChainID,
} from "@andromedaprotocol/andromeda.js";
import { useMemo } from "react";

/**
 * Wrapper hook for the andr.js chain configs
 * @param chainId
 * @returns
 */
export default function useChainConfig(
  chainId: string,
): ChainConfig | undefined {
  const config = useMemo(() => getConfigByChainID(chainId), [chainId]);

  return config;
}
