import { MAX_APP_LIMIT } from "../constants";
import { ADO_LIST_FILES } from "../hooks/useGetAdoList";
import { IImportantAdoKeys, IImportantTemplateTypes, ITemplate } from "../types";
import { getAdoList } from "../utils";

/** Upload template is used as base structure for importing a flex file
 * Flex file contains list of ados and formData, modules are inserted from this template.
 * See flex file processing at ../utils/flexFile
 */

export const BLANK_APP_TEMPLATE: ITemplate = {
    id: IImportantTemplateTypes.BLANK_CANVAS,
    adoType: "app-contract",
    name: "Empty Project",
    icon: "/app-templates/icons/blank.png",
    description:
        "Start from scratch building out your own ADO structure to be just the way you like it.",
    opts: [
        "Select your Base ADO functionality",
        "Add on your prefered modules",
        "Save as a template",
        "Publish and use!",
    ],
    ados: [
        {
            path: IImportantAdoKeys.PUBLISH_SETTING.path,
            id: IImportantAdoKeys.PUBLISH_SETTING.key,
            required: true,
        },
    ],
    adoLimit: MAX_APP_LIMIT,
    modules: [
    ],
    system: true,
    starter: true,
};

export const getBlankAppTemplateModules = async () => {
    const ALL_ADO = await getAdoList(ADO_LIST_FILES.BASE_ADO);
    const ADO_ENABLED = await getAdoList<Record<string, boolean>>('adoEnable' as any);
    const modules: NonNullable<ITemplate['modules']> = ALL_ADO.filter(ado => !!ADO_ENABLED[ado.adoType]).map(ado => ({
        'path': ado.source
    }));
    return modules;
}