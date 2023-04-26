import { useQuery } from "@tanstack/react-query"
import useAndromedaClient from "./useAndromedaClient"

const DENOM_PRIMITIVE = 'andr173c4cynmpm2ukncfsy4qkm9hf7z376cg4q766pmlsrlup9vfl23smh7n06'
const HARD_CODED_LIST = ['uandr'];

export const useDenom = () => {
    const client = useAndromedaClient()

    const { data, error, isLoading } = useQuery(
        ['andr', 'denom'],
        async () => {
            const query = {
                "andr_query": {
                    "get": null
                }
            }
            const res = await client.queryContract(DENOM_PRIMITIVE, query) as {
                key: string;
                value: {
                    string: string;
                }
            }
            console.log(res, res.value.string)
            const denoms = JSON.parse(res.value.string);
            return denoms;
        }
    )

    return {
        data: data ?? HARD_CODED_LIST,
        error,
        isLoading
    }
}