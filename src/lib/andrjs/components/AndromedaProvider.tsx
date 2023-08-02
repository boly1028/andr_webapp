import AndromedaClient from "@andromedaprotocol/andromeda.js";
import type { ChainConfig } from "@andromedaprotocol/andromeda.js";
import { cloneDeep } from "@apollo/client/utilities";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";
import React, { memo, useEffect, useMemo, useState } from "react";
import { AndromedaContext } from "../hooks";
import { useQueryChainConfig } from "@/lib/graphql/hooks/chain/useChainConfig";

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


const FIXED_KERNEL_ADDRESSES = [
  'andr1wr5vjl9tyqk0ncz5vxlak846d5c6p9uads90slljxeyzu6xj0a0q0dl6hk'
]

/**
 * Wrapper component to provide Andromeda context to child components
 */
const AndromedaProvider: React.FC<AndromedaProviderProps> = memo(
  function AndromedaProvider({ children, signer, chainId }) {
    const { data: config, loading } = useQueryChainConfig(chainId);
    const client = useMemo(() => new AndromedaClient(), []);
    const [connected, setConnected] = useState(false);
    const [factoryAddress, setFactoryAddress] = useState("");

    useEffect(() => {
      if (loading) return;
      if (!config) {
        console.warn(`No config for chain ID ${chainId}`);
        return;
      }
      if (!signer) {
        console.warn("No signer provided");
        return;
      }
      const connect = async () => {
        try {
          const kernelAddr = FIXED_KERNEL_ADDRESSES.find(addr => addr.startsWith(config.addressPrefix)) || config.kernelAddress;
          console.log(kernelAddr,"KERNEL")
          await client.connect(
            config.chainUrl,
            config.registryAddress,
            kernelAddr,
            config.addressPrefix,
            signer,
            {
              gasPrice: GasPrice.fromString(config.defaultFee),
            },
          );

          /**
           * There is some conflict with library method. Even though connect method is completed,
           * isConnected is false. Hence, check for isConnected also to sync with library properly
           */
          if (client.isConnected) {
            setConnected(true);
            console.log(cloneDeep(client.isConnected), new Date().getTime());
            setFactoryAddress(client.os.adoDB?.address ?? client.adoDB.address ?? "");
            console.log("Andromeda Client connected");
          }
        } catch (error) {
          console.error("CLIENT CONNECT ERROR::", error);
        }
      };
      setConnected(false);
      connect();
    }, [config, client, signer]);

    return (
      <AndromedaContext.Provider
        value={{
          client,
          chainId,
          // Client automatically fetches factory address as part of the "connect" functionality
          factoryAddress,
          // Registry address is stored as part of the chain config
          registryAddress: config?.registryAddress ?? "",
          connected,
        }}
      >
        {children}
      </AndromedaContext.Provider>
    );
  },
);

export default AndromedaProvider;
