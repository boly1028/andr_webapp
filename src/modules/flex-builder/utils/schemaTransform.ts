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


const deleteSchemaModule = (uuid: string, defaults?: any): any => {
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