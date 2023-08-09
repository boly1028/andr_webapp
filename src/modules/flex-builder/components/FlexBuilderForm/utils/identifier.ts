import { IAndromedaSchema } from "@/lib/schema/types"

export const isIdentifier = (schema: IAndromedaSchema) => {
    return schema.type === 'string' && schema.$original_type === 'AndrAddr'
}