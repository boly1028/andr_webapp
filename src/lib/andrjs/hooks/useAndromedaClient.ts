import useAndromedaContext from "./useAndromedaContext";

/**
 * A hook to use the current Andromeda Client in context
 * @returns
 */
export default function useAndromedaClient() {
  const { client } = useAndromedaContext();

  return client;
}
