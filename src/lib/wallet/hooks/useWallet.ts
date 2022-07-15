import { AccountData } from "@cosmjs/proto-signing";
import { useEffect, useState } from "react";
import useSigner from "./useSigner";

/**
 * Used to get the current user's first wallet
 * @returns The first user wallet
 */
export default function useWallet() {
  const signer = useSigner();
  const [accounts, setAccounts] = useState<readonly AccountData[]>([]);

  useEffect(() => {
    //If signer has been removed them remove all account data
    if (!signer || !signer.getAccounts) {
      setAccounts([]);
      return;
    }

    const assignAccounts = async () => {
      const _accounts = await signer.getAccounts();
      setAccounts(_accounts);
    };

    assignAccounts();
  }, [signer]);

  return accounts[0];
}
