import { ITemplateFormData } from "@/lib/schema/templates/types";
import { useCallback } from "react";
import { useAppBuilder } from "../canvas/Provider";

export const useAppFormData = () => {
    const { formRefs } = useAppBuilder()

    const getFormData = useCallback(() => {
        const publishData: ITemplateFormData = {}
        const ados = formRefs.current ?? {};
        Object.keys(ados).forEach(adoKey => {
            console.log(adoKey);
            const adoFormData = ados[adoKey].formData();
            publishData[adoKey] = adoFormData;
        })
        return publishData
    }, [formRefs])

    return getFormData
}