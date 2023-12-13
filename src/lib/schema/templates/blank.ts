import { ITemplate } from "./types";
import { IImportantAdoKeys, IImportantTemplateTypes } from "../types";
import { ALL_ADOS } from "../utils/list";

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

    modules: [
        ...ALL_ADOS.map((ado) => ({ path: ado.source }))
    ],
    system: true,
    starter: true,
};