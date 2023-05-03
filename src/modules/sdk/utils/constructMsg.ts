import { IAndromedaFormData } from "@/lib/schema/types";

/**
 * Contruct Msg for form Data of single ado by removing hidden fields from it
 */
export const constructMsg = (data: any) => {
    if (typeof data !== 'object') return data;
    if (Array.isArray(data)) return data;
    const filteredProperties: Record<string, any> = {};
    Object.entries(data).forEach(([key, value]) => {
        // Do not process hidden fields  starting with $
        if (key.startsWith('$')) return;
        filteredProperties[key] = value;
    })
    return filteredProperties;
}