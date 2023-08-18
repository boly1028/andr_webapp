import { useQueryTxByTags } from "@/lib/graphql/hooks/tx/useQueryTxByTags";
import { useAndromedaStore } from "@/zustand/andromeda";
import { useMemo } from "react";


export const useGetEmbeddableKeys = (embeddable: string) => {
    const chainId = useAndromedaStore(state => state.chainId);
    const { data: txs, loading } = useQueryTxByTags([
        { key: "wasm.method", value: "set_value" },
        { key: "execute._contract_address", value: embeddable },
    ], chainId);

    const keys = useMemo(() => {
        const keys: Set<string> = new Set();
        txs?.forEach(tx => {
            const events = tx.txLog?.[0]?.events ?? [];
            const key = events.find(ev => ev.type === 'wasm')?.attributes?.find(att => att.key === 'key')?.value;
            if (key) {
                keys.add(key);
            }
        })
        return Array.from(new Set(keys));
    }, [txs])
    return {
        keys, loading
    }
}