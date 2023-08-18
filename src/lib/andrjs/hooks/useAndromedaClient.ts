import { useAndromedaStore } from "@/zustand/andromeda";

/**
 * A hook to use the current Andromeda Client in context
 * @returns
 */
export default function useAndromedaClient() {
  const [client, isConnected] = useAndromedaStore(state => [state.client, state.isConnected]);

  return { client, isConnected }
}
