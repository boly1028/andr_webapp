import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";
import allSchema from './schema/classifier.json';


export type { ITemplate } from './templates/types'

export const IImportantAdoKeys = {
    BLANK_CANVAS: 'app',
    PUBLISH_SETTINGS: 'publish-settings',
    PROXY_MESSAGE: 'proxy-message',
    FUND: 'fund',
    APP: 'app'
} as const;

export type IAdoType = keyof typeof allSchema | typeof IImportantAdoKeys.PUBLISH_SETTINGS | typeof IImportantAdoKeys.PROXY_MESSAGE | typeof IImportantAdoKeys.FUND | typeof IImportantAdoKeys.APP;
export interface IAndromedaSchemaJSON {
    'schema': IAndromedaSchema;
    'ui-schema': IAndromedaUISchema;
    'form-data': IAndromedaFormData;
}

export interface IAndromedaSchema extends JSONSchema7 {
    $id: IAdoType;
    classifier: string;
    class: string;
    version: string;
    properties: JSONSchema7['properties'] & {
        $type: {
            type: 'string';
            default: IAdoType;
        };
        $class: {
            type: 'string';
            default: string;
        };
        $classifier: {
            type: 'string';
            default: string;
        };
        $removable: {
            type: 'boolean';
            default: boolean;
        };
        $enabled: {
            type: 'boolean';
            default: boolean;
        };
    }
}

export interface IAndromedaFormData {
    [name: string]: any;
    $type: IAdoType;
    $class: string;
    $classifier: string;
    $removable: boolean;
    $enabled: boolean;
}

export interface IAndromedaUISchema extends UiSchema {
    $type: { "ui:widget": "hidden" };
    $class: { "ui:widget": "hidden" };
    $classifier: { "ui:widget": "hidden" };
    $removable: { "ui:widget": "hidden" };
    $enabled: { "ui:widget": "hidden" };
}
