/**
 * This file contains list for schema and provide a neccessary wrapper for json imports. This way we can reference the
 * variables exported from this module and adjust json in one place
 */
import baseAdo from '../schema/baseADO.json'
import modifier from '../schema/modifier.json'
import moduleAdos from '../schema/module.json'
import primitive from '../schema/primitive.json'
import receive from '../schema/receive.json'
import query from '../schema/query.json'
import response from '../schema/response.json'
import system from '../schema/system.json'
import { IAdoType } from '../types'
import APP_TEMPLATES from '../templates'

/** Skipping base ados which are not yet ready for processing. Instead of removing these from schema parser
 * We can disable it here, so they will still be availaible for testing purpose if directly enabled
 */
export const INCLUDE_ADO: string[] = Array.from(new Set(APP_TEMPLATES.map(template => {
    return [...template.ados.map(ado => ado.path.split('/').pop() ?? ''), ...template.modules?.map(ado => ado.path.split('/').pop() ?? '') ?? []]
}).flat()))

export const BASE_ADOS = baseAdo.filter(ado => INCLUDE_ADO.includes(ado.$id as IAdoType));
export const MODIFIERS = modifier;
export const MODULES = moduleAdos.filter(ado => INCLUDE_ADO.includes(ado.$id as IAdoType));
export const PRIMITIVES = (primitive as IAdoList).filter((ado) => INCLUDE_ADO.includes(ado.$id as IAdoType));
export const RECEIVES = receive;
export const QUERIES = query;
export const QUERY_RESPONSES = response
export const SYSTEM_ADOS = system

export type IAdoList = typeof BASE_ADOS