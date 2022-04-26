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
    builder: "terra1rxm6y5638m6n44gmprml5d89yrjmpsjg6syvkk",
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
