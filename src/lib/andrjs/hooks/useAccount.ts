import { useAndromedaStore } from "@/zustand/andromeda"

export const useAccount = () => {
    const accounts = useAndromedaStore(state => state.accounts);
    return accounts[0] as typeof accounts[0] | undefined
}