import { useQuery } from "@tanstack/react-query";
import useAndromedaClient from "./useAndromedaClient";

export function useGetUsername(
    address?: string
) {
    const client = useAndromedaClient();
    return useQuery(
        ["account", "username", address, client?.os.vfs?.address, client?.isConnected],
        async () => {
            const vfs = client!.os.vfs?.address ?? '';
            const username = await client?.chainClient?.queryClient?.queryContractSmart(vfs, {
                "get_username": {
                    "address": address
                }
            }) as string;
            return username;
        },
        { enabled: !!address && !!client?.isConnected, refetchInterval: 5 * 1000 }
    );
}