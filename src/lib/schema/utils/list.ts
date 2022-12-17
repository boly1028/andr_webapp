import baseAdo from '../schema/baseADO.json'
import modifier from '../schema/modifier.json'
import moduleAdos from '../schema/module.json'
import primitive from '../schema/primitive.json'
import query from '../schema/query.json'
import response from '../schema/response.json'
import system from '../schema/system.json'

export const BASE_ADOS = baseAdo;
export const MODIFIERS = modifier;
export const MODULES = moduleAdos;
export const PRIMITIVES = primitive;
export const QUERIES = query;
export const QUERY_RESPONSES = response
export const SYSTEM_ADOS = system

export const ALL_SCHEMA = [...BASE_ADOS, ...MODIFIERS]