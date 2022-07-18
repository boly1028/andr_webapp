import AndromedaClient from "@andromedaprotocol/andromeda.js/dist/andr-js";
import { OfflineSigner } from "@cosmjs/proto-signing";
import React, { memo, useEffect, useMemo } from "react";
import { AndromedaContext, useChainConfig } from "../hooks";

export interface AndromedaProviderProps {
  signer?: OfflineSigner;
  chainId: string;
}

const AndromedaProvider: React.FC<AndromedaProviderProps> = memo(
  function AndromedaProvider({ children, signer, chainId }) {
    const config = useChainConfig(chainId);
    const client = useMemo(() => new AndromedaClient(), []);

    useEffect(() => {
      if (!config) {
        console.warn(`No config for chain ID ${chainId}`);
        return;
      }

      if (!signer) {
        console.warn("No signer provided");
        return;
      }

      const connect = async () => {
        await client.connect(config.chainUrl, signer, config.registryAddress);
        console.log("Client connected");
      };

      connect();
    }, [config, client, signer, chainId]);

    return (
      <AndromedaContext.Provider value={{ client, chainId }}>
        {children}
      </AndromedaContext.Provider>
    );
  },
);

export default AndromedaProvider;
