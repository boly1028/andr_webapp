/**
 * This file contains list for schema and provide a neccessary wrapper for json imports. This way we can reference the
 * variables exported from this module and adjust json in one place
 */
import { IAdoType } from '../types'
import APP_TEMPLATES from '../templates'
import { MASTER_BASEADO, MASTER_MODIFIER, MASTER_MODULE, MASTER_PRIMITIVE, MASTER_QUERY, MASTER_RECEIVE, MASTER_RESPONSE, MASTER_SYSTEM } from './masterList';

/** Skipping base ados which are not yet ready for processing. Instead of removing these from schema parser
 * We can disable it here, so they will still be availaible for testing purpose if directly enabled
 */
export const INCLUDE_ADO: string[] = Array.from(new Set(APP_TEMPLATES.map(template => {
    return [...template.ados.map(ado => ado.path.split('/').pop() ?? ''), ...template.modules?.map(ado => ado.path.split('/').pop() ?? '') ?? []]
}).flat()))

export const BASE_ADOS = MASTER_BASEADO.filter(ado => INCLUDE_ADO.includes(ado.$id as IAdoType));
export const MODIFIERS = MASTER_MODIFIER;
export const MODULES = MASTER_MODULE.filter(ado => INCLUDE_ADO.includes(ado.$id as IAdoType));
export const PRIMITIVES = MASTER_PRIMITIVE.filter((ado) => INCLUDE_ADO.includes(ado.$id as IAdoType));
export const RECEIVES = MASTER_RECEIVE;
export const QUERIES = MASTER_QUERY;
export const QUERY_RESPONSES = MASTER_RESPONSE
export const SYSTEM_ADOS = MASTER_SYSTEM

export type IAdoList = typeof BASE_ADOS