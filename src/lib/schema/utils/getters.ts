import APP_TEMPLATES from "../templates";
import { ITemplate, ITemplateFormData, ITemplateSchema, ITemplateUiSchema } from "../templates/types";
import { IAndromedaSchema, IAndromedaSchemaJSON } from "../types";
import { suid } from "./suid";


export const getADOPFromPath = async (path: string) => {
    const adop = await import(`../schema/${path}.json`).then(res => res.default) as {
        modifiers: string[]
    }
    return adop;
}

export const getSchemaFromPath = async (path: string) => {
    const schema = await import(`../schema/${path}.json`).then(res => res.default) as IAndromedaSchemaJSON;

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
    const definitions: ITemplateSchema['definitions'] = {};
    const properties: ITemplateSchema['properties'] = {};
    const uiSchema: ITemplateUiSchema = {
        'ui-order': []
    }
    const formData: ITemplateFormData = {}

    for (const ado of template.ados) {
        const schemaADO = await getSchemaFromPath(ado.path);

        // Set Definition
        definitions[ado.id] = schemaADO.schema;
        definitions[ado.id].properties.$removable.default = !ado.required;
        definitions[ado.id].properties.$enabled.default = !!ado.required;

        // Set property ref
        properties[ado.id] = { $ref: `#/definitions/${ado.id}` }

        uiSchema[ado.id] = schemaADO["ui-schema"]
        // Add ado to ui:order
        uiSchema["ui-order"].push(ado.id)

        // Add form-data
        formData[ado.id] = schemaADO["form-data"]
    }

    template.schema = {
        definitions: definitions,
        type: "object",
        properties: properties,
    };

    template.uiSchema = uiSchema;
    template.formData = formData;


    // Process modules
    if (template?.modules) {
        const modules = template.modules;
        // Import module listed in constants
        // eslint-disable-next-line @next/next/no-assign-module-variable
        for (const module of modules) {
            const data = await getSchemaFromPath(module.path);
            module.schema = data;
        }
        template.modules = modules;
    }

    return template;

}

export const getAppExecuteTemplate = async (path: string) => {
    // Parse path into title
    const adoName = path.split('/').pop() ?? suid();
    const id = path.replaceAll('/', ' ');
    const title = adoName.toUpperCase();

    // Generate Template
    const TEMPLATES: Array<ITemplate> = [
        {
            id: `${id}`,
            name: '',
            description: '',
            icon: "",
            opts: [],
            ados: [
                { path: "proxy-message", id: "proxy-message", required: true },
                { path: `${path}`, id: `${title}`, required: true },
            ],
        },
    ];

    const template = await getAppTemplateById(id, TEMPLATES);
    return template;
}