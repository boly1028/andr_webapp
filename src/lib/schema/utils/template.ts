import { IAdo, ITemplateFormData, ITemplateSchema, ITemplateUiSchema } from "../templates/types";
import { IAndromedaFormData, ITemplate } from "../types";
import { getSchemaFromPath } from "./getters";

/** Process the template by resolving schema paths found in ados and moodules list */
export const processTemplate = async (template: ITemplate) => {
    const definitions: ITemplateSchema['definitions'] = {};
    const properties: ITemplateSchema['properties'] = {};
    // Store ados in ui:order in order of their appearance in schema
    const uiSchema: ITemplateUiSchema = {
        'ui:order': []
    }
    const formData: ITemplateFormData = {}

    for (const ado of template.ados) {
        const schemaADO = await processTemplateAdo(ado, template.formData?.[ado.id])

        // Set Definition
        definitions[schemaADO.schema.$id] = schemaADO.schema;

        // Set property ref
        properties[ado.id] = { $ref: `#/definitions/${schemaADO.schema.$id}` }

        uiSchema[ado.id] = schemaADO["ui-schema"]
        // Add ado to ui:order
        uiSchema["ui:order"].push(ado.id)

        // Add form-data
        formData[ado.id] = template.formData?.[ado.id] ?? schemaADO["form-data"]

        // Set Panel States
        formData[ado.id].$removable = !ado.required;
        formData[ado.id].$enabled = !!ado.required;
    }

    template.schema = {
        definitions: definitions,
        type: "object",
        properties: properties,
        $id: 'root'
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

export const processTemplateAdo = async (ado: IAdo, formData?: IAndromedaFormData) => {
    const schemaADO = await getSchemaFromPath(ado.path);
    // Set ADO Removable status
    schemaADO.schema.properties.$removable.default = !ado.required;
    schemaADO.schema.properties.$enabled.default = !!ado.required;
    if (formData) {
        schemaADO['form-data'] = formData
    }

    return schemaADO;
}