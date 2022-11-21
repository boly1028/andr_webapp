import APP_TEMPLATES from "../templates";
import { ITemplate } from "../templates/types";
import { IAndromedaSchema, IAndromedaSchemaJSON, IImportantAdoKeys } from "../types";
import { processTemplate } from "./template";


export const getADOPFromPath = async (path: string) => {
    const adop = await import(`../schema/${path}.json`).then(res => res.default) as {
        modifiers: string[]
    }
    return adop;
}

export const getSchemaFromPath = async (path: string) => {
    const schema = await import(`../schema/${path}.json`).then(res => res.default) as IAndromedaSchemaJSON;
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