import { UiSchema } from "@andromedarjsf/utils";
import { JSONSchema7 } from "json-schema";
import versions from '../schema/version.json';

export type ISchemaVersion = (typeof versions)[keyof typeof versions];


export type { ITemplate } from '../templates/types'

export const IImportantAdoKeys = {
    BLANK_CANVAS: 'app',
    PUBLISH_SETTINGS: 'publish-settings',
    PROXY_MESSAGE: 'proxy-settings',
    EMBEDDABLE_APP: 'embeddable-app',
    FUND: 'fund',
    JSON_SCHEMA: 'json',
    APP: 'app',
    FLEX_FILE: 'import'
} as const;

export type IAdoType = keyof typeof versions | typeof IImportantAdoKeys.PUBLISH_SETTINGS | typeof IImportantAdoKeys.PROXY_MESSAGE | typeof IImportantAdoKeys.FUND | typeof IImportantAdoKeys.APP;
export interface IAndromedaSchemaJSON {
    'schema': IAndromedaSchema;
    'ui-schema': IAndromedaUISchema;
    'form-data': IAndromedaFormData;
}

export interface IAndromedaSchema extends JSONSchema7 {
    $id: IAdoType;
    $path: string;
    $original_type: string;
    classifier: string;
    class: string;
    version: string;
    properties: JSONSchema7['properties'] & {
        $type: {
            type: 'string';
            default: IAdoType;
        };
        $version: {
            type: 'string';
            default: string;
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
        $required: {
            type: 'boolean';
            default: boolean;
        };
    }
}

export interface IAndromedaFormData {
    [name: string]: any;
    $type: IAdoType;
    $version: IAndromedaSchema['properties']['$version']['default'];
    $class: string;
    $classifier: string;
    $removable: boolean;
    $enabled: boolean;
    $required: boolean;
}

export interface IAndromedaUISchema extends UiSchema {
    $type: { "ui:widget": "hidden" };
    $version: { "ui:widget": "hidden" };
    $class: { "ui:widget": "hidden" };
    $classifier: { "ui:widget": "hidden" };
    $removable: { "ui:widget": "hidden" };
    $enabled: { "ui:widget": "hidden" };
    $required: { "ui:widget": "hidden" };
}


/** HELPER TYPES FOR PROCESSING CUSTOM ADOS like PUBLISH_CONTRACT and PROXY MESSAGE. THESE
 * SHOULD BE IN SYNC WITH ACTUAL FORM DATA
 */

export interface IPublishSettingsFormData extends IAndromedaFormData {
    name: string;
}