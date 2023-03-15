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

/** Skipping base ados which are not yet ready for processing. Instead of removing these from schema parser
 * We can disable it here, so they will still be availaible for testing purpose if directly enabled
 */
const SKIP_BASE_ADOS: IAdoType[] = ['adodb', 'oracle', 'process', 'storage', 'task-balancer'];

export const BASE_ADOS = baseAdo.filter(ado => !SKIP_BASE_ADOS.includes(ado.$id as IAdoType));
export const MODIFIERS = modifier;
export const MODULES = moduleAdos;
export const PRIMITIVES = primitive;
export const RECEIVES = receive;
export const QUERIES = query;
export const QUERY_RESPONSES = response
export const SYSTEM_ADOS = system