/**
 * This file contains list for schema and provide a neccessary wrapper for json imports. This way we can reference the
 * variables exported from this module and adjust json in one place
 */
import { IAdoType } from '../types'
import { MASTER_ADOENABLE, MASTER_BASEADO, MASTER_MODIFIER, MASTER_MODULE, MASTER_PRIMITIVE, MASTER_QUERY, MASTER_RECEIVE, MASTER_RESPONSE, MASTER_SYSTEM } from './masterList';

/** Skipping base ados which are not yet ready for processing. Instead of removing these from schema parser
 * We can disable it here, so they will still be availaible for testing purpose if directly enabled
 */
export const INCLUDE_ADO: string[] = Object.keys(MASTER_ADOENABLE).filter(ado => MASTER_ADOENABLE[ado] === true);

export const BASE_ADOS = MASTER_BASEADO.filter(ado => INCLUDE_ADO.includes(ado.$id as IAdoType));
export const MODIFIERS = MASTER_MODIFIER;
export const MODULES = MASTER_MODULE.filter(ado => INCLUDE_ADO.includes(ado.$id as IAdoType));
export const PRIMITIVES = MASTER_PRIMITIVE.filter(ado => INCLUDE_ADO.includes(ado.$id as IAdoType));
export const RECEIVES = MASTER_RECEIVE;
export const QUERIES = MASTER_QUERY;
export const QUERY_RESPONSES = MASTER_RESPONSE;
export const SYSTEM_ADOS = MASTER_SYSTEM;

export const ALL_ADOS = [...BASE_ADOS, ...MODULES, ...PRIMITIVES].sort((a, b) => a.$id > b.$id ? 1 : -1);

export type IAdoList = typeof BASE_ADOS