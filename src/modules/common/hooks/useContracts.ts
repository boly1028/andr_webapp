import { useMemo } from "react";
import { useWallet } from "@terra-money/wallet-provider";

type Contracts = {
  builder: string;
};

const contracts: { [key: string]: any } = {
  mainnet: {
    builder: "",
  },
  testnet: {
    builder: "terra1k6mk75ez5kedymp34u8eqsu3jp94pa0h60q4wz",
  },
};

export const useContracts = (): Contracts => {
  const {
    network: { name },
  } = useWallet();

  return useMemo(() => {
    return contracts[name];
  }, [name]);
};

export default useContracts;
