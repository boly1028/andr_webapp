import { ITemplate } from "./types";
import { IImportantAdoKeys } from "../types";
import { BASE_ADOS, MODULES, PRIMITIVES } from "../utils/list";

export const UPLOAD_TEMPLATE: ITemplate = {
    id: IImportantAdoKeys.FLEX_FILE,
    adoType: "app",
    name: "Import Template",
    icon: "/app-templates/icons/blank.png",
    description: "Import .flex file",
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