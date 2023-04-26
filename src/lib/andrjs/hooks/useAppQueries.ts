import { useQuery } from "@tanstack/react-query"
import useAndromedaClient from "./useAndromedaClient"
import { IAdoType } from "@/lib/schema/types";

export const useAppComponents = (address: string, enable = true) => {
    const client = useAndromedaClient();
    const { data, isLoading, error } = useQuery(['andr', 'app', 'components', address], async () => {
        const compWithAdoType = await client.queryContract(address, {
            "get_components": {}
        }) as {
            name: string;
            ado_type: IAdoType
        }[]
        const promises =  compWithAdoType.map( async comp => {
            const adoAddress = await await client.queryContract(address, {
                "get_address":{
                    "name":comp.name
                }
            }) as string
            return {
                name: comp.name,
                address: adoAddress,
                adoType: comp.ado_type
            }
        })
        return Promise.all(promises)
    }, {
        enabled: enable
    })

    return {
        data,
        loading: isLoading,
        error: error as any
    }
}

export const useAppConfig = (address: string, enable = true) => {
    const client = useAndromedaClient();
    const { data, isLoading, error } = useQuery(['andr', 'app', 'config', address], async () => {
        const config = await client.queryContract(address, {
            "config": {}
        }) as {
            name: string;
            owner: string;
        }
        return config;
    }, {
        enabled: enable
    })
    return {
        data,
        loading: isLoading,
        error: error as any
    }
}