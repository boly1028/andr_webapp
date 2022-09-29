import type { OfflineSigner } from "@cosmjs/proto-signing";
import React, { useCallback, useEffect, useState } from "react";
import { connectByChainId } from "../chains";
import { useGetKeplrOnStart, WalletContext } from "../hooks";
import { toast } from "react-toastify";
import { ChainConfig } from "@andromedaprotocol/andromeda.js";

export interface WalletProviderProps {
  chainId: ChainConfig["chainId"];
}

//Local storage key for autoconnect check
const AUTOCONNECT_KEY = "keplr_autoconnect";

const WalletProvider: React.FC<WalletProviderProps> = React.memo(
  function WalletProvider({ chainId, children }) {
    //Detect Keplr instance on startup
    const { keplr, status } = useGetKeplrOnStart();
    const [stateChainId, setStateChainId] =
      useState<ChainConfig["chainId"]>(chainId);
    const [signer, setSigner] = useState<OfflineSigner | undefined>();

    //Assigns signer info to context
    const connect = useCallback(async () => {
      if (!keplr) return;
      // Enable chain
      try {
        await connectByChainId(stateChainId, keplr);
      } catch (err) {
        toast(`Could not connect to chain ${stateChainId}`, {
          type: "error",
        });
        return;
      }
      try {
        const _signer = await keplr?.getOfflineSignerAuto(stateChainId);
        setSigner(_signer);
        //Assign the auto connect storage item to be the same as the current Keplr mode
        if (_signer)
          localStorage.setItem(AUTOCONNECT_KEY, keplr?.mode ?? "extension");
      } catch (error) {
        toast("There was a problem accessing your Keplr wallet", {
          type: "error",
        });
        console.log(error);
      }
    }, [keplr, stateChainId]);

    //Checks if the user has given wallet info before, if so the wallet info is requested from Keplr
    useEffect(() => {
      const autoconnect = localStorage.getItem(AUTOCONNECT_KEY);
      if (typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
        connect();
      }
    }, [keplr, stateChainId]);

    //Removes signer info from context
    const disconnect = useCallback(() => {
      setSigner(undefined);
      localStorage.removeItem(AUTOCONNECT_KEY);
    }, []);

    return (
      <WalletContext.Provider
        value={{
          keplr,
          status,
          chainId: stateChainId,
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
