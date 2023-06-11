import JSONCrush from "jsoncrush";
import { EMBEDDABLE_TEMPLATES } from "../templates/embeddable";
import { IEmbeddableConfig } from "../types/embeddables";
import { processTemplate } from "./template";

export const getEmbeddableTemplateById = async (id: string, templates = EMBEDDABLE_TEMPLATES) => {
    const template = templates.find(t => t.id === id);
    if (!template || template.disabled) throw new Error(`Template with id: ${id} not found`);
    const result = await processTemplate(template);
    return result;
}

export const createEmbeddableUrl = (config:IEmbeddableConfig) => {
    const compressed = JSONCrush.crush(JSON.stringify(config));
    const uri = encodeURIComponent(compressed)
    return uri;
}

export const parseEmbeddableUrl = (uri: string) => {
    const uriDecoded = decodeURIComponent(uri);
    const decompressed = JSONCrush.uncrush(uriDecoded);
    const parsed = JSON.parse(decompressed) as IEmbeddableConfig;
    return parsed
}