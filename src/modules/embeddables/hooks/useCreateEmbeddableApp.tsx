import { useCallback } from "react";
import { useGetEmbeddableApp } from "./useGetEmbeddableApp";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { useCodeId } from "@/lib/andrjs";
import { useExecuteModal, useInstantiateModal } from "@/modules/modals/hooks";
import { useWallet } from "@/lib/wallet";
import { EMBEDDABLE_ADO_NAME, EMBEDDABLE_SUFFIX } from "../constants";
import { ITemplateFormData } from "@/lib/schema/templates/types";
import { IImportantAdoKeys } from "@/lib/schema/types";
import useConstructADOExecuteMsg from "@/modules/sdk/hooks/useConstructaADOExecuteMsg";

export const useCreateEmbeddableApp = () => {
    const { loading, app, embeddable } = useGetEmbeddableApp();
    const account = useWallet()
    const codeId = useCodeId('app');
    const construct = useConstructAppMsg();
    const openModal = useInstantiateModal(codeId);
    const openExecuteModal = useExecuteModal(app?.address ?? "");
    const constructExecuteMsg = useConstructADOExecuteMsg();


    const proxy = useCallback(async () => {
        const FORM_DATA: any = {
            [IImportantAdoKeys.PROXY_MESSAGE]: {
                "$type": "proxy-settings",
                "$class": "system",
                "$classifier": "",
                "$enabled": false,
                "$removable": false,
                "$required": false,
                "parent": "",
                "component_name": ""
            },
            "add-app-component": {
                "add_app_component": {
                    "component": {
                        "instantiate_msg": "e30=",
                        "ado_type": "primitive",
                        "name": EMBEDDABLE_ADO_NAME
                    }
                },
                "$type": "add-app-component",
                "$class": "modifier",
                "$classifier": "",
                "$enabled": true,
                "$removable": false,
                "$required": true
            }
        }
        const msg = constructExecuteMsg(FORM_DATA);
        openExecuteModal(msg);
    }, [constructExecuteMsg, openExecuteModal])

    const instantiate = useCallback(async () => {
        const FORM_DATA: ITemplateFormData = {
            [IImportantAdoKeys.PUBLISH_SETTINGS]: {
                "$type": "publish-settings",
                "$class": "system",
                "$classifier": "",
                "$enabled": true,
                "$removable": false,
                "$required": true,
                "name": `${account.address}-${EMBEDDABLE_SUFFIX}`
            },
            [EMBEDDABLE_ADO_NAME]: {
                "$type": "primitive",
                "$class": "primitive",
                "$classifier": "",
                "$enabled": true,
                "$removable": true,
                "$required": false
            }
        }
        console.log(FORM_DATA)
        const msg = construct(FORM_DATA);
        console.log(msg)
        openModal(msg);
    }, [openModal, construct, account])

    const create = useCallback(async () => {
        if (loading) throw new Error('Still loading ADOS. Try again in some time');
        if (embeddable) throw new Error('You already have embeddable app');
        if (app) {
            await proxy()
        } else {
            await instantiate()
        }

    }, [loading, app, embeddable, proxy, instantiate])

    return {
        create,
        loading
    }

}