import { IAndromedaFormData, IAndromedaSchema, IAndromedaSchemaJSON, IAndromedaUISchema } from "../types";

export interface ITemplate {
    id: string;
    name: string;
    icon: string;
    description: string;
    opts: string[];
    ados: IAdo[];
    modules?: IModule[];
    disabled?: boolean;
    schema?: ITemplateSchema;
    uiSchema?: ITemplateUiSchema;
    formData?: ITemplateFormData;
}

export interface ITemplateUiSchema {
    [name: string]: IAndromedaUISchema | string[];
    "ui-order": string[];
}

export interface ITemplateFormData {
    [name: string]: IAndromedaFormData;
}

export interface ITemplateSchema {
    definitions: Record<string, IAndromedaSchema>;
    properties: Record<string, ITemplateProperty>;
    type: 'object'
}

interface ITemplateProperty {
    $ref: `#/definitions/${string}`
}

interface IAdo {
    path: string;
    id: string;
    required?: boolean;
    enabled?: boolean;
}

interface IModule {
    path: string;
    schema?: IAndromedaSchemaJSON;
    required?: boolean;
    enabled?: boolean;
    disabled?: boolean;
}