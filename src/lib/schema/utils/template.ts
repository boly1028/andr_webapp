import { IAdo, ITemplateFormData, ITemplateSchema, ITemplateUiSchema } from "../templates/types";
import { IAndromedaFormData, ITemplate } from "../types";
import { getADOVersion, getSchemaFromPath } from "./schema";

/** Process the template by resolving schema paths found in ados and moodules list */
export const processTemplate = async (template: ITemplate) => {
    if (!template?.adoVersion) {
        const adoSchema = await getADOVersion(template.adoType);
        template.adoVersion = adoSchema.latest
    }
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
        formData[ado.id].$required = !!ado.required;
        formData[ado.id].$removable = (!ado.required && !!ado.removable);
        formData[ado.id].$enabled = template.formData?.[ado.id]?.$enabled ?? (!!ado.required || !!ado.enabled);
        formData[ado.id].$pos = template.formData?.[ado.id]?.$pos ?? ado.pos ?? {
            x: 0,
            y: 0
        }
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
    if (formData) {
        formData.$class = schemaADO["form-data"].$class;
        formData.$classifier = schemaADO["form-data"].$classifier;
        formData.$version = schemaADO["form-data"].$version;
        formData.$type = schemaADO["form-data"].$type;
        schemaADO['form-data'] = formData
    }

    return schemaADO;
}