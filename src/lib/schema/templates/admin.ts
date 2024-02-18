import { ADO_LIST_FILES } from "../hooks/useGetAdoList";
import { IImportantAdoKeys, IImportantTemplateTypes, ITemplate } from "../types";
import { getAdoList } from "../utils";

/** Upload template is used as base structure for importing a flex file
 * Flex file contains list of ados and formData, modules are inserted from this template.
 * See flex file processing at ../utils/flexFile
 */

export const ADMIN_APP_TEMPLATE: ITemplate = {
    id: IImportantTemplateTypes.ADMIN_TEMPLATE,
    adoType: "app-contract",
    name: "Admin Panel",
    icon: "/app-templates/icons/blank.png",
    description:
        "Admin template which contains all ados including those which are in beta phase",
    opts: [
        "ADO's are in development phase",
        "Breaking changes",
        "Loss of ADO",
        "Only for admin/testing purpose",
    ],
    ados: [
        {
            path: IImportantAdoKeys.PUBLISH_SETTING.path,
            id: IImportantAdoKeys.PUBLISH_SETTING.key,
            required: true,
        },
    ],

    modules: [
    ],
    system: true,
    starter: false,
};

export const getAdminAppTemplateModules = async () => {
    const ALL_ADO = await getAdoList(ADO_LIST_FILES.ALL_ADO);
    const modules: NonNullable<ITemplate['modules']> = ALL_ADO.map(ado => ({
        'path': ado.source
    }));
    return modules;
}