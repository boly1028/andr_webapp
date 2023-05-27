import { useGetPrimitiveValue } from "@/lib/graphql/hooks/primitive/useGetValue";
import { useMemo } from "react";

const DENOM_PRIMITIVE = 'andr173c4cynmpm2ukncfsy4qkm9hf7z376cg4q766pmlsrlup9vfl23smh7n06'
const HARD_CODED_LIST = ['uandr'];

export const useDenom = () => {
    const { data, error, loading } = useGetPrimitiveValue(DENOM_PRIMITIVE)

    const result = useMemo(() => {
        let res = [...HARD_CODED_LIST];
        console.log(data)
        try {
            if (data) {
                const fromContract = JSON.parse(data.value.string);
                res = [...fromContract]
            }
        } catch (err) {
            console.log(err)
        }
        return res;
    }, [data])
    return {
        data: result,
        error,
        loading
    }
}