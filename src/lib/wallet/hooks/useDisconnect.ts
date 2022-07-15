import useWalletContext from "./useWalletContext";

/**
 * Returns a disconnect function which removes the current wallet info from wallet context
 * @returns
 */
export default function useDisconnect(): () => void {
  const { disconnect } = useWalletContext();
  return disconnect;
}
