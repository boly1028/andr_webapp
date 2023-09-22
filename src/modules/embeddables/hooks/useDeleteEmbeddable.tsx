import { useCallback } from "react";
import { useExecuteModal } from "@/modules/modals/hooks";
import useConstructADOExecuteMsg from "@/modules/sdk/hooks/useConstructaADOExecuteMsg";
import { useAndromedaStore } from "@/zustand/andromeda";
import { EMBEDDABLE_DB } from "../constants";
import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";

export const useDeleteEmbeddable = () => {
    const chainId = useAndromedaStore(state => state.chainId);
    const constructExecuteMsg = useConstructADOExecuteMsg();
    const openModal = useExecuteModal(EMBEDDABLE_DB[chainId]);

    const deleteKey = useCallback(async (key: string) => {
        const FORM_DATA: any = {
            "delete_value": {
                "delete_value": {
                    "key": key
                },
                "$type": "delete_value",
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
    return deleteKey;
}