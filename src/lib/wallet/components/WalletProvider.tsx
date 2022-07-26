import type { OfflineSigner } from "@cosmjs/proto-signing";
import React, { useCallback, useEffect, useState } from "react";
import { connectByChainId } from "../chains";
import { useGetKeplrOnStart, WalletContext } from "../hooks";
import { toast } from "react-toastify";

export interface WalletProviderProps {
  chainId: string;
}

//Local storage key for autoconnect check
const AUTOCONNECT_KEY = "keplr_autoconnect";

const WalletProvider: React.FC<WalletProviderProps> = React.memo(
  function WalletProvider({ chainId, children }) {
    //Detect Keplr instance on startup
    const { keplr, status } = useGetKeplrOnStart();
    const [stateChainId, setStateChainId] = useState<string>(chainId);
    const [signer, setSigner] = useState<OfflineSigner | undefined>();

    //Sets the chainID from props if it changes, also ensures Keplr has the chain info
    useEffect(() => {
      if (stateChainId !== chainId) {
        setStateChainId(chainId);
      }

      const enableChain = async () => {
        //Ensure Keplr has info for current chain ID
        if (keplr) {
          try {
            await connectByChainId(chainId, keplr);
          } catch (error) {
            toast(`Could not connect to chain ${chainId}`, { type: "error" });
          }
        }
      };
      enableChain();
    }, [chainId, keplr, stateChainId]);

    //Assigns signer info to context
    const connect = useCallback(async () => {
      try {
        const _signer = await keplr?.getOfflineSignerAuto(chainId);
        setSigner(_signer);
        //Assign the auto connect storage item to be the same as the current Keplr mode
        if (_signer)
          localStorage.setItem(AUTOCONNECT_KEY, keplr?.mode ?? "extension");
      } catch (error) {
        toast("There was a problem accessing your Keplr wallet", {
          type: "error",
        });
      }
    }, [chainId, keplr]);
    //Removes signer info from context
    const disconnect = useCallback(() => {
      setSigner(undefined);
      localStorage.removeItem(AUTOCONNECT_KEY);
    }, []);

    //Checks if the user has given wallet info before, if so the wallet info is requested from Keplr
    useEffect(() => {
      const autoconnect = localStorage.getItem(AUTOCONNECT_KEY);
      if (typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
        connect();
      }
    }, [connect, keplr]);

    return (
      <WalletContext.Provider
        value={{
          keplr,
          status,
          chainId,
          setChainId: setStateChainId,
          signer,
          connect,
          disconnect,
        }}
      >
        {children}
      </WalletContext.Provider>
    );
  },
);

export default WalletProvider;
