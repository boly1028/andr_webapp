import { IAdo } from "@/lib/schema/types/templates"
import { IImportantAdoKeys, IPublishSettingsFormData } from "@/lib/schema/types"
import { getSchemaFromPath } from "@/lib/schema/utils"
import { createFlexFileFromADOS, createFlexUrl } from "@/lib/schema/utils/flexFile"
import { downloadBlob } from "@/utils/file"
import { useCallback } from "react"
import { useAppBuilder, useReactFlow } from "../canvas/Provider"
import { useAppFormData } from './useAppFormData'


// TODO: Add edge cache in template to retain edge directions

export const useDownloadFlex = () => {
    const { formRefs, editorRef } = useAppBuilder()
    const getFormData = useAppFormData()
    const { getNode } = useReactFlow()

    const create = useCallback(async () => {
        const formData = getFormData();
        const ados: IAdo[] = []

        // We want to push publish settings ado so that this flex file can be included in flex-builder also
        ados.push({
            id: IImportantAdoKeys.PUBLISH_SETTING.key,
            path: IImportantAdoKeys.PUBLISH_SETTING.path,
            required: true
        })
        const pubSetSchema = await getSchemaFromPath(IImportantAdoKeys.PUBLISH_SETTING.path);
        const pubSetFormData: IPublishSettingsFormData = {
            ...pubSetSchema["form-data"],
            $required: true,
            $removable: false,
            $enabled: true,
            name: editorRef.current?.getAppName?.() ?? 'APP'
        }
        formData[IImportantAdoKeys.PUBLISH_SETTING.key] = pubSetFormData;

        Object.keys(formRefs.current).forEach(adoId => {
            const node = getNode(adoId)
            if (!node) return;
            ados.push({
                id: adoId,
                path: node.data.andromedaSchema.schema.$path,
                required: formRefs.current[adoId].formData.$required,
                'enabled': formRefs.current[adoId].formData.$enabled,
                pos: node.position
            })
        })
        const flexFile = await createFlexFileFromADOS({ ados, formData })
        return flexFile
    }, [formRefs, editorRef, getFormData, getNode])

    const download = useCallback(async () => {
        const flexFile = await create()
        //Load data to be exported by the browser
        const flexBlob = new Blob([JSON.stringify(flexFile)], {
            type: "text/plain",
        });
        const appName = "app";
        downloadBlob(flexBlob, `template_${appName}.flex`);

    }, [create])

    const getUrl = useCallback(async () => {
        const flexFile = await create()
        const url = createFlexUrl(flexFile)
        return url
    }, [create])

    return {
        downloadFlex: download,
        generateFlexUrl: getUrl,
        createFlex: create
    }
}