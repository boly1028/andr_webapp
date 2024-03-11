import { useQuery } from "@tanstack/react-query";
import useAndromedaClient from "../useAndromedaClient";

export function useGetAppComponents(
    address: string
) {
    const client = useAndromedaClient();
    return useQuery(
        ["app", "components", address, client?.isConnected],
        async () => {
            const username = await client?.chainClient?.queryClient?.queryContractSmart(address, {
                "get_addresses_with_names": {
                }
            }) as Array<{ name: string, address: string }>;
            return username;
        },
        { enabled: !!address && !!client?.isConnected }
    );
}