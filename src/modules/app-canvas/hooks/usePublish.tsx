import { useCodeId } from "@/lib/andrjs";
import { ITemplateFormData } from "@/lib/schema/templates/types";
import { useInstantiateModal } from "@/modules/modals/hooks";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useAppBuilder } from "../canvas/Provider";
import { useAppFormData } from "./useAppFormData";

export const usePublish = () => {
    const { formRefs, editorRef } = useAppBuilder()
    const getFormData = useAppFormData()

    const toast = useToast()
    const codeId = useCodeId("app");
    const construct = useConstructAppMsg();
    const openModal = useInstantiateModal(codeId);

    const handlePublish = useCallback(() => {
        if (codeId === -1) {
            console.warn("Code ID not fetched");
            return;
        }
        try {
            const ados = formRefs.current ?? {};
            Object.keys(ados).forEach(adoKey => {
                console.log(adoKey);
                ados[adoKey].validate();
            })
            const formData = getFormData()
            const name = editorRef.current.getAppName?.() ?? 'Untitled App'
            const msg = construct(formData, name);
            openModal(msg);
        } catch (err) {
            toast({
                title: `Error while validating`,
                status: 'error'
            })
        }
    }, [codeId, toast, construct, openModal, formRefs, getFormData, editorRef])

    return handlePublish
}