import { UiSchema } from "@andromedarjsf/utils";
import { JSONSchema7 } from "json-schema";
import versions from '../schema/version.json';
import { XYPosition } from "reactflow";

export type ISchemaVersion = (typeof versions)[keyof typeof versions];


export type { ITemplate } from '../templates/types'

export const IImportantTemplateTypes = {
    BLANK_CANVAS: 'app',
    IMPORT: 'import'
}

export const IImportantAdoKeys = {
    PUBLISH_SETTING: { key: 'publish-setting', path: '$system/latest/publish-setting' },
    PROXY_SETTING: { key: 'proxy-setting', path: '$system/latest/proxy-setting' },
    EMBEDDABLE_APP: { key: 'embeddable-app', path: 'embeddables/latest/app' },
    FUND: { key: 'fund', path: '$system/latest/fund' },
    JSON_SCHEMA: { key: 'json', path: '$system/latest/json' },
    APP: { key: 'app-contract', path: 'app-contract/latest/app-contract' },
} as const;

export type IStrictAdoType = keyof typeof versions;
export type IAdoType = IStrictAdoType | "app";
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
        $pos: {
            type: 'object';
            properties: {
                x: {
                    type: 'number';
                    default: number;
                },
                y: {
                    type: 'number';
                    default: number;
                }
            }
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
    $pos: XYPosition;
}

export interface IAndromedaUISchema extends UiSchema {
    $type: { "ui:widget": "hidden" };
    $version: { "ui:widget": "hidden" };
    $class: { "ui:widget": "hidden" };
    $classifier: { "ui:widget": "hidden" };
    $removable: { "ui:widget": "hidden" };
    $enabled: { "ui:widget": "hidden" };
    $required: { "ui:widget": "hidden" };
    $pos: { "ui:widget": "hidden" };
}


/** HELPER TYPES FOR PROCESSING CUSTOM ADOS like PUBLISH_CONTRACT and PROXY MESSAGE. THESE
 * SHOULD BE IN SYNC WITH ACTUAL FORM DATA
 */

export interface IPublishSettingsFormData extends IAndromedaFormData {
    name: string;
}