import AndromedaClient from "@andromedaprotocol/andromeda.js/dist/andr-js";
import { useContext, createContext } from "react";

export interface AndromedaContextProps {
  client: AndromedaClient;
  // The address of the Andromeda factory contract on the current chain
  factoryAddress: string;
  // The current chain ID
  chainId: string;
  // The address of the Andromeda registry contract on the current chain
  registryAddress: string;
  // Whether the client is connected to the chain
  connected: boolean;
}

const defaultValue = {
  client: new AndromedaClient(),
  chainId: "",
  factoryAddress: "",
  registryAddress: "",
  connected: false,
};

export const AndromedaContext =
  createContext<AndromedaContextProps>(defaultValue);

/**
 * A hook for the current Andromeda context object
 * @returns
 */
export default function useAndromedaContext(): AndromedaContextProps {
  return useContext(AndromedaContext);
}
