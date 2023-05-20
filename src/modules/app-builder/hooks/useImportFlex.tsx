import { ITemplate } from "@/lib/schema/templates/types"
import { IImportantAdoKeys } from "@/lib/schema/types"
import { parseFlexUrl } from "@/lib/schema/utils/flexFile"
import { processTemplateAdo } from "@/lib/schema/utils/template"
import useConfirmationModal from "@/modules/modals/hooks/useConfirmationModal"
import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"
import { useAppBuilder, useReactFlow } from "../canvas/Provider"
import useAddNode from "./useAddNode"
import useFitView from "./useFitView"
import useResetCanvas from "./useResetCanvas"


// TODO: Prepopulate edge cache if provided in template data

export const useImportFlex = (overide = true) => {
    const { isDirty, editorRef } = useAppBuilder()
    const { getNodes } = useReactFlow()

    const open = useConfirmationModal(
        'warning',
        '',
        'Opening a saved project or template will remove your current build. Do you want to proceed?', 'Open Project')

    const toast = useToast({
        status: 'loading',
        position: 'top-right',
        title: "Loading Template",
        isClosable: true,
        size: 'sm'
    })

    const addNode = useAddNode()
    const { reset } = useResetCanvas()
    const fitView = useFitView();

    const handleImport = useCallback(async (template: ITemplate) => {
        if (overide) reset(true);
        const tId = toast()
        template.ados = template.ados.filter(ado => ado.id !== IImportantAdoKeys.PUBLISH_SETTINGS);
        for (const ado of template.ados) {
            const adoSchema = await processTemplateAdo(ado, template.formData?.[ado.id])
            addNode(adoSchema, { id: ado.id, position: ado.pos })
        }
        setTimeout(() => {
            fitView()
            toast.close(tId)
            editorRef.current.setDirty?.(true)
        }, 300)
    }, [addNode, fitView, overide, reset, editorRef])

    const importFlexFile = useCallback(async (template: ITemplate) => {
        if (isDirty && getNodes().length > 0) {
            open(() => handleImport(template))
            return;
        } else {
            await handleImport(template);
        }
    }, [handleImport, open, getNodes])

    const importFlexUrl = useCallback(async (url: string) => {
        const template = await parseFlexUrl(url)
        importFlexFile(template)
    }, [importFlexFile])

    return {
        importFlexFile,
        importFlexUrl
    }
}