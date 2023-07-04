import { useAppComponents } from "@/lib/graphql/hooks/app/useAppComponents";
import { useQueryTxByTags } from "@/lib/graphql/hooks/tx/useQueryTxByTags";
import { useWallet, useWalletContext } from "@/lib/wallet";
import { useMemo } from "react";
import { EMBEDDABLE_ADO_NAME, EMBEDDABLE_SUFFIX } from "../constants";


export const useGetEmbeddableApp = () => {
    const { chainId, } = useWalletContext();
    const account = useWallet()
    const { data: appsTx, loading } = useQueryTxByTags([
        { key: "wasm.method", value: "instantiate" },
        { key: "wasm.type", value: "app" },
        { key: "wasm.owner", value: account?.address },
        { key: "wasm.andr_app", value: `${account?.address}-${EMBEDDABLE_SUFFIX}` },
    ], chainId);

    const appAddress = useMemo(() => {
        const events = appsTx?.[0]?.txLog?.[0]?.events ?? [];
        const contractAddress = events.find(ev => ev.type === 'reply')?.attributes?.find(att => att.key === '_contract_address')?.value;
        return contractAddress ?? '';
    }, [appsTx])

    const { data: userApp, loading: isLoading } = useAppComponents(appAddress);
    const embeddablePrimitive = useMemo(() => {
        return userApp?.components?.find(ado => ado.name === EMBEDDABLE_ADO_NAME && ado.ado_type === 'primitive')
    }, [userApp])

    return {
        app: userApp,
        embeddable: embeddablePrimitive,
        loading: loading || isLoading
    }
}