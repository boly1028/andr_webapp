import { ITemplateFormData, ITemplateSchema, ITemplateUiSchema } from "@/lib/schema/templates/types";
import { IAndromedaSchemaJSON } from "@/lib/schema/types";
import { cloneDeep } from "@apollo/client/utilities";


interface IDefaults {
    schema?: ITemplateSchema;
    uiSchema?: ITemplateUiSchema;
    formData?: ITemplateFormData;
}


/**Add Schema using the the previous default data */
export const addSchemaModule = (
    uuid: string,
    data: IAndromedaSchemaJSON,
    _defaults?: IDefaults,
) => {
    const defaults = cloneDeep(_defaults);
    const schemaDefinitions = defaults?.schema?.definitions || {};
    const schemaProperties = defaults?.schema?.properties || {};
    const _uiSchema = defaults?.uiSchema || {} as ITemplateUiSchema;
    const _formData = defaults?.formData || {};

    schemaDefinitions[`${uuid}`] = data.schema;

    schemaProperties[`${uuid}`] = { $ref: `#/definitions/${uuid}` };

    // ui-schema
    _uiSchema[`${uuid}`] = data["ui-schema"];
    // Add new schema to ui order
    _uiSchema[`ui:order`] = [...(_uiSchema[`ui:order`] as string[]) ?? ['*'], uuid];

    // form-data
    _formData[`${uuid}`] = data["form-data"]

    const _schema = {
        definitions: schemaDefinitions,
        type: "object",
        properties: schemaProperties,
    };

    return {
        schema: _schema,
        uiSchema: _uiSchema,
        formData: _formData,
    };
}


export const deleteSchemaModule = (uuid: string, oriDefaults?: IDefaults) => {
    const defaults = cloneDeep(oriDefaults)
    const schemaDefinitions = defaults?.schema?.definitions || {};
    const schemaProperties = defaults?.schema?.properties || {};

    const _uiSchema = defaults?.uiSchema || {} as ITemplateUiSchema;
    const _formData = defaults?.formData || {};
    // Remove schema id from ui:order
    _uiSchema['ui:order'] = _uiSchema['ui:order']?.filter(id => id !== uuid)

    delete schemaDefinitions[`${uuid}`];
    delete schemaProperties[`${uuid}`];
    delete _uiSchema[`${uuid}`];
    delete _formData[`${uuid}`];

    const _schema = {
        definitions: schemaDefinitions,
        type: "object",
        properties: schemaProperties,
    };

    return {
        schema: _schema,
        uiSchema: _uiSchema,
        formData: _formData,
    };
};

export const changeSchemaID = (oldPanelName: string, newPanelName: string, _defaults?: IDefaults) => {
    const defaults = cloneDeep(_defaults);

    const schemaDefinitions = defaults?.schema?.definitions || {};
    const schemaProperties = defaults?.schema?.properties || {};
    const _uiSchema = defaults?.uiSchema || {} as ITemplateUiSchema;
    const _formData = defaults?.formData || {};

    // confirm new panel label doesn't already exist
    if (schemaDefinitions[`${newPanelName}`]) {
        return undefined
    }

    /**Copy full definition and replace the ref with new id */
    schemaProperties[`${newPanelName}`] = {
        ...schemaProperties[`${oldPanelName}`],
        '$ref': `#/definitions/${newPanelName}`
    }

    schemaDefinitions[`${newPanelName}`] = schemaDefinitions[`${oldPanelName}`];
    _uiSchema[`${newPanelName}`] = _uiSchema[`${oldPanelName}`];

    // Remove previous id from ui:order and add new id in place
    _uiSchema['ui:order'] = _uiSchema['ui:order']?.map(id => {
        if (id === oldPanelName) return newPanelName;
        return id;
    })
    _formData[`${newPanelName}`] = _formData[`${oldPanelName}`];

    // remove previous panel definitions
    delete schemaDefinitions[`${oldPanelName}`];
    delete schemaProperties[`${oldPanelName}`];
    delete _uiSchema[`${oldPanelName}`];
    delete _formData[`${oldPanelName}`];

    const _schema = {
        definitions: schemaDefinitions,
        type: "object",
        properties: schemaProperties,
    };

    return {
        schema: _schema,
        uiSchema: _uiSchema,
        formData: _formData,
    };
};


export const duplicatePanelSchema = (panelName: string, newPanelName: string, _defaults?: IDefaults) => {
    const defaults = cloneDeep(_defaults);

    const schemaDefinitions = defaults?.schema?.definitions || {};
    const schemaProperties = defaults?.schema?.properties || {};

    const _uiSchema = defaults?.uiSchema || {} as ITemplateUiSchema;
    const _formData = defaults?.formData || {};


    // duplicate schemas with provided panel name
    schemaDefinitions[`${newPanelName}`] = schemaDefinitions[`${panelName}`];

    /**Copy full definition and replace the ref with new id */
    schemaProperties[`${newPanelName}`] = {
        ...schemaProperties[`${panelName}`],
        '$ref': `#/definitions/${newPanelName}`
    }
    _formData[`${newPanelName}`] = _formData[`${panelName}`];
    _uiSchema[`${newPanelName}`] = _uiSchema[`${panelName}`];
    // Add new schema to last of ui order
    _uiSchema[`ui:order`] = [...(_uiSchema[`ui:order`] as string[] ?? ['*']), newPanelName];

    // build schema from prior definitions & properties for return submission for passing to updateForm() function
    const _schema = {
        definitions: schemaDefinitions,
        type: "object",
        properties: schemaProperties,
    };
    return {
        schema: _schema,
        uiSchema: _uiSchema,
        formData: _formData,
    };
};