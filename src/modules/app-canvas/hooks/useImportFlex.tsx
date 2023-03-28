import { ITemplate } from "@/lib/schema/templates/types"
import { IImportantAdoKeys } from "@/lib/schema/types"
import { parseFlexUrl } from "@/lib/schema/utils/flexFile"
import { processTemplateAdo } from "@/lib/schema/utils/template"
import { useCallback } from "react"
import useAddNode from "./useAddNode"
import useResetCanvas from "./useResetCanvas"

export const useImportFlex = (overide = true) => {
    const addNode = useAddNode()
    const reset = useResetCanvas()

    const importFlexFile = useCallback(async (template: ITemplate) => {
        if (overide) reset();
        template.ados = template.ados.filter(ado => ado.id !== IImportantAdoKeys.PUBLISH_SETTINGS);
        for (const ado of template.ados) {
            const adoSchema = await processTemplateAdo(ado, template.formData?.[ado.id])
            addNode(adoSchema, ado.id, { position: ado.pos })
        }
    }, [addNode, overide])

    const importFlexUrl = useCallback(async (url: string) => {
        const template = await parseFlexUrl(url)
        importFlexFile(template)
    }, [importFlexFile])

    return {
        importFlexFile,
        importFlexUrl
    }
}