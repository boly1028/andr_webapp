import { ITemplate } from "@/lib/schema/templates/types"
import { IImportantAdoKeys } from "@/lib/schema/types"
import { parseFlexUrl } from "@/lib/schema/utils/flexFile"
import { processTemplateAdo } from "@/lib/schema/utils/template"
import { useCallback } from "react"
import { XYPosition } from "reactflow"
import { useAppBuilder } from "../canvas/Provider"

export const useImportFlex = (overide = true) => {
    const { addNode, reset } = useAppBuilder()

    const importFlexFile = useCallback(async (template: ITemplate) => {
        if (overide) reset();
        template.ados = template.ados.filter(ado => ado.id !== IImportantAdoKeys.PUBLISH_SETTINGS);
        const GAP = 50;
        let x: number = -template.ados.length * GAP / 2;
        for (const ado of template.ados) {
            const adoSchema = await processTemplateAdo(ado, template.formData?.[ado.id])
            const pos: XYPosition = {
                x: x,
                y: Math.floor(Math.random() * GAP * 6) - GAP * 3,
                ...ado.pos
            };
            x = x + GAP;
            addNode(adoSchema, ado.id, { position: pos })
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