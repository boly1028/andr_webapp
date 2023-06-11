import { EMBEDDABLE_TEMPLATES } from "../templates/embeddable";
import { processTemplate } from "./template";

export const getEmbeddableTemplateById = async (id: string, templates = EMBEDDABLE_TEMPLATES) => {
    const template = templates.find(t => t.id === id);
    if (!template || template.disabled) throw new Error(`Template with id: ${id} not found`);
    const result = await processTemplate(template);
    return result;
}