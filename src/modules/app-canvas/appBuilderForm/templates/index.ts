import { TemplatesType } from '@andromedarjsf/utils'
import FieldTemplate from './FieldTemplate';
import ObjectFieldTemplate from './ObjectFieldTemplate';



const TEMPLATES: Partial<TemplatesType> = {
    FieldTemplate: FieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate as any
}

export default Object.freeze(TEMPLATES);