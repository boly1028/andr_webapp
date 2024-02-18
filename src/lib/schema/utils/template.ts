import { IAdo, ITemplateFormData, ITemplateSchema, ITemplateUiSchema } from "../types/templates";
import { IAdoType, IAndromedaFormData, IImportantAdoKeys, IImportantTemplateTypes, ITemplate } from "../types";
import { getADOPFromPath, getADOVersion, getSchemaFromPath } from "./schema";
import { getBlankAppTemplateModules } from "../templates/blank";
import { getAdminAppTemplateModules } from "../templates/admin";
import { getAdoTemplate } from "../templates/ado";

/** Process the template by resolving schema paths found in ados and moodules list */
export const processTemplate = async (template: ITemplate) => {
    if (!template?.adoVersion) {
        const adoSchema = await getADOVersion(template.adoType);
        template.adoVersion = adoSchema.latest
    }
    const definitions: ITemplateSchema['definitions'] = {};
    const properties: ITemplateSchema['properties'] = {};
    // Store ados in ui:order in order of their appearance in schema
    const uiSchema: ITemplateUiSchema = {
        'ui:order': []
    }
    const formData: ITemplateFormData = {}

    for (const ado of template.ados) {
        const schemaADO = await processTemplateAdo(ado, template.formData?.[ado.id])

        // Set Definition
        definitions[schemaADO.schema.$id] = schemaADO.schema;

        // Set property ref
        properties[ado.id] = { $ref: `#/definitions/${schemaADO.schema.$id}` }

        uiSchema[ado.id] = schemaADO["ui-schema"]
        // Add ado to ui:order
        uiSchema["ui:order"].push(ado.id)

        // Add form-data
        formData[ado.id] = template.formData?.[ado.id] ?? schemaADO["form-data"]

        // Set Panel States
        formData[ado.id].$required = !!ado.required;
        formData[ado.id].$removable = (!ado.required && !!ado.removable);
        formData[ado.id].$enabled = template.formData?.[ado.id]?.$enabled ?? (!!ado.required || !!ado.enabled);
        formData[ado.id].$pos = template.formData?.[ado.id]?.$pos ?? ado.pos ?? {
            x: 0,
            y: 0
        }
    }

    template.schema = {
        definitions: definitions,
        type: "object",
        properties: properties,
        $id: 'root'
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

export const processTemplateAdo = async (ado: IAdo, formData?: IAndromedaFormData) => {
    const schemaADO = await getSchemaFromPath(ado.path);
    if (formData) {
        formData.$class = schemaADO["form-data"].$class;
        formData.$classifier = schemaADO["form-data"].$classifier;
        formData.$version = schemaADO["form-data"].$version;
        formData.$type = schemaADO["form-data"].$type;
        schemaADO['form-data'] = formData
    }

    return schemaADO;
}


export const getFlexBuilderTemplateById = async (id: string, templates: ITemplate[]) => {
    let template = templates.find(t => t.id === id);
    if (!template) {
        template = id.startsWith(IImportantTemplateTypes.ADO_TEMPLATE) ? await getAdoTemplate(id.replace(`${IImportantTemplateTypes.ADO_TEMPLATE}-`, '') as IAdoType) : undefined;
    }
    if (!template || template.disabled) throw new Error(`Template with id: ${id} not found`);
    if (template.id === IImportantTemplateTypes.BLANK_CANVAS) {
        template.modules = await getBlankAppTemplateModules();
    } else if (template.id === IImportantTemplateTypes.ADMIN_TEMPLATE) {
        template.modules = await getAdminAppTemplateModules();
    }
    const result = await processTemplate(template);
    return result;
}

export const getADOExecuteTemplate = async (path: string) => {
    // Generate Template
    const currentTemplate: ITemplate = {
        id: path,
        adoType: path.split('/')[0] as any || 'app',
        name: '',
        description: '',
        icon: "",
        opts: [],
        ados: [
            { path: IImportantAdoKeys.PROXY_SETTING.path, id: IImportantAdoKeys.PROXY_SETTING.key, required: false, removable: false, enabled: false },
            { path: path, id: path.split('/').pop() ?? "Execute", required: true },
        ],
        modules: [
            { 'path': IImportantAdoKeys.FUND.path }
        ]
    };

    const template = await processTemplate(currentTemplate);
    return template;
}

export const getADOMultiExecuteTemplate = async (path: string) => {
    const ADOPS = await getADOPFromPath(`${path}/ADOP`);
    // Generate Template
    const currentTemplate: ITemplate = {
        id: path,
        adoType: path.split('/')[0] as any || 'app',
        name: '',
        description: '',
        icon: "",
        opts: [],
        ados: [
            { path: IImportantAdoKeys.PROXY_SETTING.path, id: IImportantAdoKeys.PROXY_SETTING.key, required: false, removable: false, enabled: false },
        ],
        modules: [
            ...ADOPS.modifiers.map(ado => ({ path: `${path}/${ado}` })),
            { 'path': IImportantAdoKeys.FUND.path }
        ]
    };
    const template = await processTemplate(currentTemplate);
    return template;
}

export const getADOQueryTemplate = async (path: string) => {
    // Generate Template
    const currentTemplate: ITemplate = {
        id: path,
        adoType: path.split('/')[0] as any || 'app',
        name: '',
        description: '',
        icon: "",
        opts: [],
        ados: [
            { path: path, id: path.split('/').pop() ?? "Query", required: true, removable: false },
        ],
        modules: [
        ]
    };

    const template = await processTemplate(currentTemplate);
    return template;
}