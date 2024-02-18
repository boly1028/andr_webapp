import { IAdoType, IImportantTemplateTypes, ITemplate } from "../types";
import { getSchemaFromPath } from "../utils";


export const getAdoTemplate = async (adoType: IAdoType, version = 'latest') => {
    const source = `${adoType}/${version}/${adoType}`;
    const schema = await getSchemaFromPath(source);
    const template: ITemplate = {
        id: `${IImportantTemplateTypes.ADO_TEMPLATE}-${adoType}`,
        adoType: adoType,
        name: schema.schema.title || adoType,
        description: schema.schema.description || "",
        opts: [adoType],
        ados: [
            {
                path: source,
                id: adoType,
                required: true,
            },
        ],
        modules: [
            // { path: "adodb/latest/adodb" },
        ],
        icon: "/app-templates/icons/market.png",
        installed: false,
        system: true,
        starter: false,
        formData: {
        }
    }
    return template;
}