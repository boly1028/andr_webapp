import { useCallback } from "react";
import { useExecuteModal } from "@/modules/modals/hooks";
import useConstructADOExecuteMsg from "@/modules/sdk/hooks/useConstructaADOExecuteMsg";
import { useAndromedaStore } from "@/zustand/andromeda";
import { EMBEDDABLE_DB } from "../constants";
import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";

export const useCreateEmbeddable = () => {
    const chainId = useAndromedaStore(state => state.chainId);
    const constructExecuteMsg = useConstructADOExecuteMsg();
    const openModal = useExecuteModal(EMBEDDABLE_DB[chainId]);

    const create = useCallback(async (key: string, data: IEmbeddableConfig) => {
        data.chainId = chainId;
        const time = new Date().toISOString()
        data.createdDate = data.createdDate || time;
        data.modifiedDate = time;
        const FORM_DATA: any = {
            "set_value": {
                "set_value": {
                    "value": {
                        "string": JSON.stringify(data)
                    },
                    "key": key
                }
                ,
                "$type": "set_value",
                "$class": "modifier",
                "$classifier": "",
                "$enabled": true,
                "$removable": false,
                "$required": true
            }
        }
        const msg = constructExecuteMsg(FORM_DATA);
        openModal(msg);
    }, [constructExecuteMsg, openModal])
    return create;
}