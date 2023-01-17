import { IAdo } from "@/lib/schema/templates/types"
import { IImportantAdoKeys, IPublishSettingsFormData } from "@/lib/schema/types"
import { getSchemaFromPath } from "@/lib/schema/utils"
import { createFlexFileFromADOS, createFlexUrl } from "@/lib/schema/utils/flexFile"
import { downloadBlob } from "@/utils/file"
import { useCallback } from "react"
import { useAppBuilder, useReactFlow } from "../canvas/Provider"
import { useAppFormData } from '../hooks/useAppFormData'

export const useDownloadFlex = () => {
    const { formRefs } = useAppBuilder()
    const getFormData = useAppFormData()
    const { getNode } = useReactFlow()

    const create = useCallback(async () => {
        const formData = getFormData();
        const ados: IAdo[] = []

        // We want to push publish settings ado so that this flex file can be included in flex-builder also
        ados.push({
            id: IImportantAdoKeys.PUBLISH_SETTINGS,
            path: IImportantAdoKeys.PUBLISH_SETTINGS,
            required: true
        })
        const pubSetSchema = await getSchemaFromPath(IImportantAdoKeys.PUBLISH_SETTINGS);
        const pubSetFormData: IPublishSettingsFormData = {
            ...pubSetSchema["form-data"],
            $removable: false,
            $enabled: true,
            name: 'app' // App Name will be added here
        }
        formData[IImportantAdoKeys.PUBLISH_SETTINGS] = pubSetFormData;

        Object.keys(formRefs.current).forEach(adoId => {
            const node = getNode(adoId)
            if (!node) return;
            ados.push({
                id: adoId,
                path: node.data.andromedaSchema.schema.$path,
                required: !formRefs.current[adoId].formData.$removable,
                'enabled': formRefs.current[adoId].formData.$enabled,
                pos: node.position
            })
        })
        const flexFile = await createFlexFileFromADOS({ ados, formData })
        return flexFile
    }, [formRefs, getFormData, getNode])

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
        generateFlexUrl: getUrl
    }
}