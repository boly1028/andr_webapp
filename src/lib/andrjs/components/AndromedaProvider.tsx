import AndromedaClient, { ChainConfig } from "@andromedaprotocol/andromeda.js";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";
import React, { memo, useEffect, useMemo, useState } from "react";
import { AndromedaContext, useChainConfig } from "../hooks";

/**
 * Base64 encoding function
 * @param data
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function encode(data: any): string {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

export interface AndromedaProviderProps {
  signer?: OfflineSigner;
  chainId: ChainConfig["chainId"];
}

/**
 * Wrapper component to provide Andromeda context to child components
 */
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
      }

      const connect = async () => {
        try {
          await client.connect(
            config.chainUrl,
            config.registryAddress,
            signer,
            {
              gasPrice: GasPrice.fromString(config.defaultFee),
            },
          );
          console.log("Andromeda Client connected");
        } catch (error) {
          console.error(error);
        }
      };
      connect();
    }, [config, client, signer]);

    return (
      <AndromedaContext.Provider
        value={{
          client,
          chainId,
          // Client automatically fetches factory address as part of the "connect" functionality
          factoryAddress: client.ado.factory.address ?? "",
          // Registry address is stored as part of the chain config
          registryAddress: config?.registryAddress ?? "",
          connected: client.isConnected,
        }}
      >
        {children}
      </AndromedaContext.Provider>
    );
  },
);

export default AndromedaProvider;
