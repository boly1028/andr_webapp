import { XYPosition } from "reactflow";
import { IAdoType, IAndromedaFormData, IAndromedaSchema, IAndromedaSchemaJSON, IAndromedaUISchema } from "../types";

// Template interface used in flex builder processing
export interface ITemplate {
    id: string;
    adoType: IAdoType;
    name: string;
    icon: string;
    description: string;
    opts: string[];
    ados: IAdo[];
    modules?: IModule[];
    disabled?: boolean;
    // Schema, uiSchema is created and inserted after template processing
    schema?: ITemplateSchema;
    uiSchema?: ITemplateUiSchema;
    formData?: ITemplateFormData;
    installed?: boolean;
    starter?: boolean;
    system?: boolean;
}

// UI Schema for template which enforces ui:order field. ui:order field confirms panel position in the array
export interface ITemplateUiSchema {
    [name: string]: IAndromedaUISchema | string[];
    "ui:order": string[];
}

export interface ITemplateFormData {
    [appName: string]: IAndromedaFormData;
}

export interface ITemplateSchema {
    definitions: Record<string, IAndromedaSchema>;
    properties: Record<string, ITemplateProperty>;
    type: 'object',
    $id: string
}

interface ITemplateProperty {
    $ref: `#/definitions/${string}`
}

export interface IAdo {
    path: string;
    id: string;
    required?: boolean;
    enabled?: boolean;
    pos?: XYPosition;
}

// TODO: Remove fields from modules which are not needed
interface IModule {
    path: string;
    schema?: IAndromedaSchemaJSON;
    required?: boolean;
    enabled?: boolean;
    disabled?: boolean;
}