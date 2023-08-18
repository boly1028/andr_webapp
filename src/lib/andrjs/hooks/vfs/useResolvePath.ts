import { useQuery } from "@tanstack/react-query";
import useAndromedaClient from "../useAndromedaClient";

export function useResolvePath(
    path: string
) {
    const { client, isConnected } = useAndromedaClient();
    return useQuery(
        ["vfs", "resolve_path", path, client.os.vfs?.address, client.isConnected],
        async () => {
            const vfs = client.os.vfs?.address ?? '';
            const address = await client.chainClient?.queryClient?.queryContractSmart(vfs, {
                "resolve_path": {
                    "path": path
                }
            }) as string;
            return address;
        },
        { enabled: isConnected && client.isConnected, retry: false }
    );
}