import {
  ChainConfig,
  getConfigByChainID,
} from "@andromedaprotocol/andromeda.js";
import { useMemo } from "react";

export default function useChainConfig(
  chainId: string,
): ChainConfig | undefined {
  const config = useMemo(() => getConfigByChainID(chainId), [chainId]);

  return config;
}
