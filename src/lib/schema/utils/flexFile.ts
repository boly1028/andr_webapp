import { cloneDeep } from "@apollo/client/utilities";
import JSONCrush from "jsoncrush";
import { ITemplateFormData, ITemplateSchema } from "../templates/types";
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
}

/**
 * Creates a flex file from the current schema and formData. It stores formData as it is and process
 * schema to extract id and path and insert them in ados field for template
 * @param {schema, formData}: Data you want to insert in flex template
 * @returns flex template
 */
export const createFlexFile = async ({ schema, formData }: ICreateInput) => {
    const template: ITemplate = cloneDeep(UPLOAD_TEMPLATE);
    Object.keys(schema.properties).map((id) => {
        template.ados.push({
            id: id,
            path: schema.definitions[id].$path,
            required: true,
            'enabled': true
        })
    })
    template.modules = [];
    template.formData = formData;
    return template
}


// Just a cool feature to create json crush encoded url for template data
export const createFlexUrl = async (data: ICreateInput) => {
    const temp = await createFlexFile(data);
    const compressed = JSONCrush.crush(JSON.stringify(temp));
    console.log("CRUSH:ORIGINAL", temp);
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