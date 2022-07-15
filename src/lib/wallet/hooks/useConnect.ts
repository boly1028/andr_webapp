import useWalletContext from "./useWalletContext";

/**
 * Returns a connection function used to request the user's wallet info. Currently prompted via Keplr
 * @returns A connect function used to request the user's wallet info
 */
export default function useConnect(): () => void {
  const { connect } = useWalletContext();
  return connect;
}
