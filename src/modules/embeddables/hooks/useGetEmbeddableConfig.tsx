import { useGetPrimitiveValue } from "@/lib/graphql/hooks/primitive/useGetValue";
import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";
import { useMemo } from "react";

export const useGetEmbeddabeleConfig = (address: string, key: string) => {
    const { data: value, loading } = useGetPrimitiveValue(address, key);
    const config = useMemo(() => {
        try {
            console.log(value, key)
            return JSON.parse(value?.value?.string ?? '--') as IEmbeddableConfig;
        } catch (err) {
            console.log(err)
            return undefined;
        }
    }, [value])

    return {
        config, loading
    }
}