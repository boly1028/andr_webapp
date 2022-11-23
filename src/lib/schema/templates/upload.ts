import { ITemplate } from "./types";
import baseAdo from '../schema/baseADO.json'
import modules from '../schema/module.json'
import primitive from '../schema/primitive.json'
import { IImportantAdoKeys } from "../types";

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
        ...baseAdo.map(ado => ({ path: ado.source })),
        ...modules.map(ado => ({ path: ado.source })),
        ...primitive.map(ado => ({ path: ado.source })),
    ],
};