import { cloneDeep } from "lodash";
import JSONCrush from "jsoncrush";
import { IAdo, ITemplateFormData, ITemplateSchema } from "../templates/types";
import { UPLOAD_TEMPLATE } from "../templates/upload"
import { ITemplate } from "../types"
import { processTemplate } from "./template";

export const parseFlexFile = async (template: ITemplate) => {
    template.modules = cloneDeep(UPLOAD_TEMPLATE.modules);
    const processed = await processTemplate(template);
    return processed;
}

interface ICreateInput {
    schema: ITemplateSchema;
    formData: ITemplateFormData;
    template?: ITemplate;
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
export const createFlexFile = async ({ schema, formData, template }: ICreateInput) => {
    const ados: IAdo[] = []
    Object.entries(schema.properties).map(([id, property]) => {
        const definitionId = property.$ref.split('/').pop() ?? '';
        const definition = schema.definitions[definitionId];
        ados.push({
            id: id,
            path: definition.$path,
            required: formData[id]?.$required,
            'enabled': formData[id]?.$enabled
        })
    })

    const result = await createFlexFileFromADOS({ ados, formData, template })
    return result
}


export const createFlexFileFromADOS = async ({ ados, formData, template: defaultTemplate }: ICreateInputFromADO) => {
    const template: ITemplate = cloneDeep(defaultTemplate ?? UPLOAD_TEMPLATE);
    template.ados = ados;
    // Modules are not important for processing and make flex file huge. Hence remove all modules from list.
    // Modules are added back while parsing flex file depending on where they are loaded
    template.modules = [];
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