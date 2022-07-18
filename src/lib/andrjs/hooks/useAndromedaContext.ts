import AndromedaClient from "@andromedaprotocol/andromeda.js/dist/andr-js";
import { useContext, createContext } from "react";

export interface AndromedaContextProps {
  client: AndromedaClient;
  chainId: string;
}

const defaultValue = {
  client: new AndromedaClient(),
  chainId: "",
};

export const AndromedaContext =
  createContext<AndromedaContextProps>(defaultValue);

export default function useAndromedaContext(): AndromedaContextProps {
  return useContext(AndromedaContext);
}
