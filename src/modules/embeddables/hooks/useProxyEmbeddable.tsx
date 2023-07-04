import { IImportantAdoKeys } from "@/lib/schema/types";
import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";
import { useGetEmbeddableApp } from "./useGetEmbeddableApp";
import { useExecuteModal } from "@/modules/modals/hooks";
import useConstructProxyMsg from "@/modules/sdk/hooks/useConstructProxyMsg";

export const useProxyEmbeddable = (key: string, value: IEmbeddableConfig) => {
    const { app, embeddable } = useGetEmbeddableApp();
    const openExecuteModal = useExecuteModal(app?.address ?? "");
    const constructExecuteMsg = useConstructProxyMsg();

    const proxy = () => {
        if (!app || !embeddable) throw new Error('NOT')
        const FORM_DATA: any = {
            [IImportantAdoKeys.PROXY_MESSAGE]: {
                "$type": "proxy-settings",
                "$class": "system",
                "$classifier": "",
                "$enabled": true,
                "$removable": false,
                "$required": false,
                "parent": app.address,
                "component_name": embeddable.name
            },
            "set-value": {
                "set_value": {
                    "value": {
                        "string": JSON.stringify(value)
                    },
                    "key": key
                },
                "$type": "set-value",
                "$class": "modifier",
                "$classifier": "",
                "$enabled": true,
                "$removable": false,
                "$required": true
            }
        }
        const msg = constructExecuteMsg(FORM_DATA);
        openExecuteModal(msg);
    }

    return {
        proxy
    }

}