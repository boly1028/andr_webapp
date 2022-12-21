/**
 * This file contains schema related getter functions which wrap most of the repetitive functions and interactions with
 * schema jsons. You get nice Promise based functions for interecting with schema.
 */

import { cloneDeep } from "@apollo/client/utilities";
import APP_TEMPLATES from "../templates";
import { ITemplate } from "../templates/types";
import { IAdoType, IAndromedaSchema, IAndromedaSchemaJSON, IImportantAdoKeys, ISchemaVersion } from "../types";
import { processTemplate } from "./template";

export const getADOVersion = async (ado: IAdoType) => {
    const version = await import(`../schema/${ado}/version.json`).then(res => res.default).then(data => cloneDeep(data)) as {
        latest: string;
        versions: string[]
    }
    return version;
}

export const getADOVersionDetails = async (ado: IAdoType, version = 'latest') => {
    if (version === 'latest') {
        version = await getADOVersion(ado).then(res => res.latest);
    }
    const versionDetails: ISchemaVersion = await import(`../schema/${ado}/version.json`).then(res => res.default).then(data => cloneDeep(data))
    return versionDetails;
}

export const resolveVersionInPath = async (path: string) => {
    try {
        if (path.includes('/latest/')) {
            const ado = path.split('/')[0] as IAdoType;
            const adoVersion = await getADOVersion(ado);
            // If we are referencing ado with latest version, get the latest version number and update it
            path = path.replace('/latest/', `/${adoVersion.latest}/`)
        }
    } catch (err) {
        console.warn(err)
    }
    return path
}

export const getADOPFromPath = async (path: string) => {
    path = await resolveVersionInPath(path)
    const adop = await import(`../schema/${path}.json`).then(res => res.default).then(data => cloneDeep(data)) as {
        modifiers: string[]
    }
    return adop;
}

export const getSchemaFromPath = async (path: string) => {
    path = await resolveVersionInPath(path)

    const schema = await import(`../schema/${path}.json`).then(res => res.default).then(data => {
        /**Interesting bug here. If you do not deep clone here, all imports have same reference, so when you process
         * same schema again, the transformations below are applied to every reference
         */
        return cloneDeep(data)
    }) as IAndromedaSchemaJSON;
    
    schema.schema.$path = path;

    const properties: IAndromedaSchema['properties'] = {
        $type: {
            type: 'string',
            default: schema.schema.$id
        },
        $class: {
            type: 'string',
            default: schema.schema.class
        },
        $classifier: {
            type: 'string',
            default: schema.schema.classifier
        },
        $enabled: {
            type: 'boolean',
            default: true
        },
        $removable: {
            type: 'boolean',
            default: true
        }
    }

    // Set default properties from above created object
    schema.schema.properties = {
        ...schema.schema.properties ?? {},
        ...properties
    }

    // Hide custom properties from ui-schema. These alaways start with '$'
    schema["ui-schema"].$class = {
        'ui:widget': 'hidden'
    };
    schema["ui-schema"].$classifier = {
        'ui:widget': 'hidden'
    };
    schema["ui-schema"].$removable = {
        'ui:widget': 'hidden'
    };
    schema["ui-schema"].$enabled = {
        'ui:widget': 'hidden'
    };
    schema["ui-schema"].$type = {
        'ui:widget': 'hidden'
    };

    return schema;
}

export const getAppTemplateById = async (id: string, templates = APP_TEMPLATES) => {
    const template = templates.find(t => t.id === id);
    if (!template || template.disabled) throw new Error(`Template with id: ${id} not found`);
    const result = await processTemplate(template);
    return result;
}

export const getProxyTemplate = async (path: string) => {
    // Generate Template
    const currentTemplate: ITemplate = {
        id: path,
        adoType: 'app',
        name: '',
        description: '',
        icon: "",
        opts: [],
        ados: [
            { path: IImportantAdoKeys.PROXY_MESSAGE, id: IImportantAdoKeys.PROXY_MESSAGE, required: true },
            { path: path, id: path.split('/').pop() ?? "Execute", required: true },
        ],
        modules: [
            // { 'path': IImportantAdoKeys.FUND }
        ]
    };

    const template = await processTemplate(currentTemplate);
    return template;
}

export const getADOExecuteTemplate = async (path: string) => {
    // Generate Template
    const currentTemplate: ITemplate = {
        id: path,
        adoType: 'app',
        name: '',
        description: '',
        icon: "",
        opts: [],
        ados: [
            { path: path, id: path.split('/').pop() ?? "Execute", required: true },
        ],
        modules: [
            { 'path': IImportantAdoKeys.FUND }
        ]
    };

    const template = await processTemplate(currentTemplate);
    return template;
}