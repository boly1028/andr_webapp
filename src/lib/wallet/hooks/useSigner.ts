import type { OfflineSigner } from "@cosmjs/proto-signing";
import useWalletContext from "./useWalletContext";

/**
 * Returns the current signer object for use with CosmJS
 * @returns A CosmJS compatible OfflineSigner
 */
export default function useSigner(): OfflineSigner | undefined {
  const { signer } = useWalletContext();

  return signer;
}
