import { useQuery } from "@tanstack/react-query";
import useAndromedaClient from "../useAndromedaClient";
import AndromedaClient from "@andromedaprotocol/andromeda.js";

export function useResolvePath(
    path: string
) {
    const client = useAndromedaClient();
    return useQuery(
        ["vfs", "resolve_path", path, client?.os.vfs?.address, client?.isConnected],
        async () => {
            const address = await resolveVfs(client!, path)
            return address;
        },
        { enabled: !!client?.isConnected && !path.startsWith('./'), retry: false }
    );
}

export const resolveVfs = async (client: AndromedaClient, path: string) => {
    const vfs = client?.os.vfs?.address ?? '';
    const address = await client?.chainClient?.queryClient?.queryContractSmart(vfs, {
        "resolve_path": {
            "path": path
        }
    }) ?? '';
    return address as string;
}