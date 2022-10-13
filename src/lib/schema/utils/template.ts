import { ITemplateFormData, ITemplateSchema, ITemplateUiSchema } from "../templates/types";
import { ITemplate } from "../types";
import { getSchemaFromPath } from "./getters";

export const processTemplate = async (template: ITemplate) => {
    const definitions: ITemplateSchema['definitions'] = {};
    const properties: ITemplateSchema['properties'] = {};
    const uiSchema: ITemplateUiSchema = {
        'ui-order': []
    }
    const formData: ITemplateFormData = {}

    for (const ado of template.ados) {
        const schemaADO = await getSchemaFromPath(ado.path);

        // Set Definition
        definitions[ado.id] = schemaADO.schema;
        definitions[ado.id].properties.$removable.default = !ado.required;
        definitions[ado.id].properties.$enabled.default = !!ado.required;

        // Set property ref
        properties[ado.id] = { $ref: `#/definitions/${ado.id}` }

        uiSchema[ado.id] = schemaADO["ui-schema"]
        // Add ado to ui:order
        uiSchema["ui-order"].push(ado.id)

        // Add form-data
        formData[ado.id] = schemaADO["form-data"]
    }

    template.schema = {
        definitions: definitions,
        type: "object",
        properties: properties,
    };

    template.uiSchema = uiSchema;
    template.formData = formData;


    // Process modules
    if (template?.modules) {
        const modules = template.modules;
        // Import module listed in constants
        // eslint-disable-next-line @next/next/no-assign-module-variable
        for (const module of modules) {
            const data = await getSchemaFromPath(module.path);
            module.schema = data;
        }
        template.modules = modules;
    }

    return template;
}