import { ITemplateFormData } from "@/lib/schema/types/templates";
import { useCallback } from "react";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";

export const useAppFormData = () => {
    const { formRefs } = useAppBuilder()
    const { getNodes } = useReactFlow()

    const getFormData = useCallback(() => {
        const publishData: ITemplateFormData = {}
        const ados = formRefs.current ?? {};
        const nodes = getNodes()
        nodes.forEach(node => {
            const adoKey = node.id;
            if (ados[adoKey]) {
                const adoFormData = ados[adoKey].formData;
                publishData[adoKey] = adoFormData;
            }
        })
        return publishData
    }, [formRefs])

    return getFormData
}