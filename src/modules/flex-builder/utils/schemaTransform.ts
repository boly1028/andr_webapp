import { isUndefined } from "util";
import { v4 as uuidv4 } from "uuid";


/** TODO: ADD DOCUMENTATION FOR EACH FUNCTION (Anshu) */


/**Add Schema using the the previous default data */
export const addSchemaModule = (
    uuid: string | undefined,
    data: SchemaModule,
    defaults?: SchemaObject,
) => {
    const schemaDefinitions = defaults?.schemaDefinitions || {};
    const schemaProperties = defaults?.schemaProperties || {};
    const _uiSchema = defaults?.uiSchema || {};
    const _formData = defaults?.formData || {};

    const updatedData = updateSchemaModule(data, {
        'schema': {},
        'form-data': {},
        'ui-schema': {}
    })

    schemaDefinitions[`${uuid}`] = updatedData.definition;

    schemaProperties[`${uuid}`] = { $ref: `#/definitions/${uuid}` };

    // ui-schema
    _uiSchema[`${uuid}`] = updatedData.uiSchema;

    // form-data
    _formData[`${uuid}`] = updatedData.formData

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

export const updateSchemaModule = (
    data: SchemaModule,
    defaults: SchemaModule,
) => {

    const _definition = {
        ...(defaults['schema'] ?? {}),
        ...(data["schema"] ?? {})
    };

    _definition["properties"]["$type"] = {
        type: "string",
        default: data["schema"]["$id"],
    };
    _definition["properties"]["$class"] = {
        type: "string",
        default: data["schema"]["class"],
    };
    _definition["properties"]["$classifier"] = {
        type: "string",
        default: data["schema"]["classifier"],
    };
    _definition["properties"]["$removable"] = {
        type: "boolean",
        default: true,
    };
    _definition["properties"]["$enabled"] = {
        type: "boolean",
        default: true,
    };


    const _uiSchema = {
        ...(defaults['ui-schema'] ?? {}),
        ...(data["ui-schema"] ?? {})
    };


    _uiSchema["$class"] = { "ui:widget": "hidden" };
    _uiSchema["$classifier"] = { "ui:widget": "hidden" };
    _uiSchema["$removable"] = { "ui:widget": "hidden" };
    _uiSchema["$enabled"] = { "ui:widget": "hidden" };
    _uiSchema["$type"] = { "ui:widget": "hidden" };

    // form-data
    const _formData = {
        ...(defaults['form-data'] ?? {}),
        ...(data["form-data"] ?? {})
    };

    return {
        uiSchema: _uiSchema,
        formData: _formData,
        definition: _definition
    };
}


export const deleteSchemaModule = (uuid: string, defaults?: SchemaObject) => {
    const schemaDefinitions = defaults?.schemaDefinitions || {};
    const schemaProperties = defaults?.schemaProperties || {};

    const _uiSchema = defaults?.uiSchema || {};
    const _formData = defaults?.formData || {};

    // Removal of elements with passed UUID for $id
    const id = uuid.split("_").pop();
    delete schemaDefinitions[`${id}`];
    delete schemaProperties[`${id}`];
    delete _uiSchema[`${id}`];
    delete _formData[`${id}`];

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

export const changeSchemaID = (oldPanelName: string, newPanelName: string, defaults?: SchemaObject) => {
    const schemaDefinitions = defaults?.schemaDefinitions || {};
    const schemaProperties = defaults?.schemaProperties || {};
    const _uiSchema = defaults?.uiSchema || {};
    const _formData = defaults?.formData || {};

    // confirm new panel label doesn't already exist
    if (!isUndefined(schemaDefinitions[`${newPanelName}`])) {
        return undefined
    }

    /**Copy full definition and replace the ref with new id */
    schemaProperties[`${newPanelName}`] = {
        ...schemaProperties[`${oldPanelName}`],
        '$ref': `#/definitions/${newPanelName}`
    }

    schemaDefinitions[`${newPanelName}`] = schemaDefinitions[`${oldPanelName}`];
    _uiSchema[`${newPanelName}`] = _uiSchema[`${oldPanelName}`];
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


export const duplicatePanelSchema = (panelName: string, defaults?: SchemaObject) => {
    const schemaDefinitions = defaults?.schemaDefinitions || {};
    const schemaProperties = defaults?.schemaProperties || {};

    const _uiSchema = defaults?.uiSchema || {};
    const _formData = defaults?.formData || {};

    const newPanelName = uuidv4(); // Create a new unique value to assign to the duplicated panel

    //if start of panel name is "root_", then reference with prefix excluded
    if (panelName.slice(0, 5) === "root_") {
        panelName = panelName.slice(5);
    }

    // duplicate schemas with provided panel name
    schemaDefinitions[`${newPanelName}`] = schemaDefinitions[`${panelName}`];

    /**Copy full definition and replace the ref with new id */
    schemaProperties[`${newPanelName}`] = {
        ...schemaProperties[`${panelName}`],
        '$ref': `#/definitions/${newPanelName}`
    }
    _uiSchema[`${newPanelName}`] = _uiSchema[`${panelName}`];
    _formData[`${newPanelName}`] = _formData[`${panelName}`];

    // build schema from prior definitions & properties for return submission for passing to updateForm() function
    const _schema = {
        definitions: schemaDefinitions,
        type: "object",
        properties: schemaProperties,
    };
    alert("Panel duplicated with name " + newPanelName + ".");
    return {
        schema: _schema,
        uiSchema: _uiSchema,
        formData: _formData,
    };
};

interface SchemaModule {
    'schema': any;
    'form-data': any;
    'ui-schema': any;
}

interface SchemaObject {
    schemaDefinitions: Record<string, any>;
    formData: Record<string, any>;
    uiSchema: Record<string, any>;
    schemaProperties: Record<string, any>;
}