import baseAdo from '../schema/baseADO.json'
import moduleAdos from '../schema/module.json'
import primitive from '../schema/primitive.json'

export const MASTER_ADO_LIST = [...baseAdo, ...moduleAdos, ...primitive];