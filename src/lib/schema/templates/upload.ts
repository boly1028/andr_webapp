import { ITemplate } from "./types";
import { IImportantAdoKeys, IImportantTemplateTypes } from "../types";
import { BASE_ADOS, MODULES, PRIMITIVES } from "../utils/list";

/** Upload template is used as base structure for importing a flex file
 * Flex file contains list of ados and formData, modules are inserted from this template.
 * See flex file processing at ../utils/flexFile
 */

export const UPLOAD_TEMPLATE: ITemplate = {
    id: IImportantTemplateTypes.IMPORT,
    adoType: "app-contract",
    name: "Saved File",
    icon: "/app-templates/icons/blank.png",
    description: "Import .flex file to continue from where you left off.",
    opts: [
        "Import saved template",
        "Add on your prefered modules",
        "Save as a template",
        "Publish and use!",
    ],
    ados: [],
    modules: [
        ...BASE_ADOS.map(ado => ({ path: ado.source })),
        ...MODULES.map(ado => ({ path: ado.source })),
        ...PRIMITIVES.map(ado => ({ path: ado.source })),
    ],
};