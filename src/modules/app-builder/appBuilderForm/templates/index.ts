import { TemplatesType } from '@andromedarjsf/utils'
import ArrayFieldItemTemplate from './ArrayFieldItemTemplate';
import ArrayFieldTemplate from './ArrayFieldTemplate';
import BaseInputTemplate from './BaseInputTemplate';
import DescriptionField from './DescriptionField';
import FieldTemplate from './FieldTemplate';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import TitleField from './TitleField';



const TEMPLATES: Partial<TemplatesType> = {
    FieldTemplate: FieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate as any,
    BaseInputTemplate: BaseInputTemplate,
    ArrayFieldTemplate: ArrayFieldTemplate,
    ArrayFieldItemTemplate: ArrayFieldItemTemplate,
    DescriptionFieldTemplate: DescriptionField,
    TitleFieldTemplate: TitleField

}

export default Object.freeze(TEMPLATES);