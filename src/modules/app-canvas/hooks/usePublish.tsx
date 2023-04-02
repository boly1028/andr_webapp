import { useCodeId } from "@/lib/andrjs";
import { ITemplateFormData } from "@/lib/schema/templates/types";
import { useInstantiateModal } from "@/modules/modals/hooks";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";
import { useAppFormData } from "./useAppFormData";

export const usePublish = () => {
    const { formRefs, editorRef } = useAppBuilder()
    const getFormData = useAppFormData()
    const { getNodes } = useReactFlow()

    const toast = useToast({
        position: 'top-right',
        variant: 'solid'
    })
    const codeId = useCodeId("app");
    const construct = useConstructAppMsg();
    const openModal = useInstantiateModal(codeId);

    const getMsg = useCallback(() => {
        try {
            const nodes = getNodes()
            const ados = formRefs.current ?? {};
            nodes.forEach(node => {
                const adoKey = node.id;
                if (ados[adoKey]) {
                    console.log(ados[adoKey].formData)
                    ados[adoKey].validate();
                }
            })
            const formData = getFormData()
            const name = editorRef.current.getAppName?.() ?? 'Untitled App'
            const msg = construct(formData, name);
            return msg;
        } catch (err: any) {
            console.log(err)
            toast({
                title: `Error while validating`,
                description: err.message,
                status: 'error'
            })
        }
    }, [getNodes, formRefs, getFormData, editorRef, construct, toast])

    const handlePublish = useCallback(() => {
        if (codeId === -1) {
            console.warn("Code ID not fetched");
            return;
        }
        const msg = getMsg();
        if (msg) {
            openModal(msg);
        }
    }, [codeId, openModal, getMsg])

    return { handlePublish, getMsg }
}