import { cloneDeep } from "lodash";
import JSONCrush from "jsoncrush";
import { IAdo, ITemplateFormData, ITemplateSchema, ITemplateUiSchema } from "../templates/types";
import { ITemplate } from "../types"
import { processTemplate } from "./template";
import { BLANK_APP_TEMPLATE } from "../templates/blank";

export const parseFlexFile = async (template: ITemplate) => {
    const processed = await processTemplate(template);
    return processed;
}

interface ICreateInput {
    schema: ITemplateSchema;
    formData: ITemplateFormData;
    template?: ITemplate;
    order?: ITemplateUiSchema['ui:order'];
}

interface ICreateInputFromADO {
    ados: IAdo[];
    formData: ITemplateFormData;
    template?: ITemplate;
}

/**
 * Creates a flex file from the current schema and formData. It stores formData as it is and process
 * schema to extract id and path and insert them in ados field for template
 * @param {schema, formData}: Data you want to insert in flex template
 * @returns flex template
 */
export const createFlexFile = async ({ schema, formData: _formData, template, order = [] }: ICreateInput) => {
    const formData = cloneDeep(_formData);
    const ados: IAdo[] = []
    Object.entries(schema.properties).map(([id, property]) => {
        const definitionId = property.$ref.split('/').pop() ?? '';
        const definition = schema.definitions[definitionId];
        ados.push({
            id: id,
            path: definition.$path,
            required: formData[id]?.$required,
            'enabled': formData[id]?.$enabled,
            removable: formData[id]?.$removable,
            pos: formData[id]?.$pos
        })
    })
    ados.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    const result = await createFlexFileFromADOS({ ados, formData, template })
    return result
}

export const createFlexFileFromADOS = async ({ ados, formData, template: defaultTemplate }: ICreateInputFromADO) => {
    const template: ITemplate = cloneDeep(defaultTemplate ?? BLANK_APP_TEMPLATE);
    template.ados = ados;
    template.schema = undefined;
    template.uiSchema = undefined;
    // Modules are not important for processing and make flex file huge. Hence remove all modules from list.
    // Modules are added back while parsing flex file depending on where they are loaded
    template.modules = [];
    Object.keys(formData).forEach(panel => {
        Object.keys(formData[panel]).forEach(key => {
            if (key.startsWith('$')) delete formData[panel][key];
        })
    })
    template.formData = formData;
    return template;
}

// Just a cool feature to create json crush encoded url for template data
export const createFlexUrl = async (template: ITemplate) => {
    const compressed = JSONCrush.crush(JSON.stringify(template));
    console.log("CRUSH:ORIGINAL", template);
    console.log("CRUSH:COMPRESSED", compressed);
    const uri = encodeURIComponent(compressed)
    return uri;
}

export const parseFlexUrl = async (uri: string) => {
    const uriDecoded = decodeURIComponent(uri);
    const decompressed = JSONCrush.uncrush(uriDecoded);
    const flexFile = JSON.parse(decompressed);
    const parsed = await parseFlexFile(flexFile);
    console.log("CRUSH:DECOMPRESSES", flexFile)
    return parsed
}