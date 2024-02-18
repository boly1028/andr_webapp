/**
 * This file contains schema related getter functions which wrap most of the repetitive functions and interactions with
 * schema jsons. You get nice Promise based functions for interecting with schema.
 */

import { cloneDeep } from "@apollo/client/utilities";
import { IAdoType, IAndromedaSchema, IAndromedaSchemaJSON, ISchemaVersion } from "../types";
import { SCHEMA_API_AXIOS } from "@/lib/axios";
import { IAdoList } from "../types/templates";

export const getAdoList = async <T = IAdoList>(item: string) => {
    const list = await SCHEMA_API_AXIOS.get(`version/${item}`).then(res => res.data) as T;
    return list;
}


export const getADOVersion = async (ado: IAdoType) => {
    if (ado as any === 'app') ado = 'app-contract';
    const version = await SCHEMA_API_AXIOS.get(`version/${ado}/version`).then(res => res.data).then(data => cloneDeep(data)) as {
        latest: string;
        versions: string[]
    }
    return version;
}

export const getADOVersionDetails = async (ado: IAdoType, version = 'latest') => {
    if (version === 'latest') {
        version = await getADOVersion(ado).then(res => res.latest);
    }
    const versionDetails: ISchemaVersion = await SCHEMA_API_AXIOS.get(`version/${ado}/version`).then(res => res.data).then(data => cloneDeep(data))
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
    const adop = await SCHEMA_API_AXIOS.get(`version/${path}`).then(res => res.data).then(data => cloneDeep(data)) as {
        modifiers: string[],
        queries: string[],
        responses: string[],
        cw721receives?: string[],
        cw20receives?: string[],
    }
    return adop;
}

export const getSchemaFromPath = async (path: string) => {
    path = await resolveVersionInPath(path)

    const schema = await SCHEMA_API_AXIOS.get(`version/${path}`).then(res => res.data).then(data => {
        /**Interesting bug here. If you do not deep clone here, all imports have same reference, so when you process
         * same schema again, the transformations below are applied to every reference
         */
        return cloneDeep(data)
    }) as IAndromedaSchemaJSON;

    schema.schema.$path = path;

    const properties: IAndromedaSchema['properties'] = {
        $type: {
            type: 'string',
            // Type will also contain version number
            default: schema.schema.$id
        },
        $version: {
            type: 'string',
            // Type will also contain version number
            default: schema.schema.version
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
        },
        $required: {
            type: 'boolean',
            default: false
        },
        $pos: {
            type: 'object',
            properties: {
                x: {
                    type: 'number',
                    default: 0
                },
                y: {
                    type: 'number',
                    default: 0
                },
            }
        }
    }

    schema["form-data"]['$removable'] = schema["form-data"]['$removable'] ?? true;
    schema["form-data"]["$required"] = schema["form-data"]["$required"] ?? false;
    schema["form-data"]["$enabled"] = schema["form-data"]["$enabled"] ?? true;
    schema['form-data'].$class = schema.schema.class;
    schema['form-data'].$classifier = schema.schema.classifier;
    schema['form-data'].$version = schema.schema.version;
    schema['form-data'].$type = schema.schema.$id;

    // Set default properties from above created object
    schema.schema.properties = {
        ...(schema.schema.properties ?? {}),
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
    schema["ui-schema"].$version = {
        'ui:widget': 'hidden'
    };
    schema["ui-schema"].$required = {
        'ui:widget': 'hidden'
    };
    schema["ui-schema"].$pos = {
        'ui:widget': 'hidden'
    };

    if (schema.schema.class !== 'response') {
        schema["ui-schema"]["owner"] = {
            'ui:widget': 'hidden'
        };
        schema["ui-schema"]["kernel_address"] = {
            'ui:widget': 'hidden'
        };
    }

    return schema;
}