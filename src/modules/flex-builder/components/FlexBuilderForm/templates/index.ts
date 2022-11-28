import { TemplatesType } from '@rjsf/full/node_modules/@rjsf/utils'
import ArrayFieldItemTemplate from './ArrayFieldItemTemplate';
import ArrayFieldTemplate from './ArrayFieldTemplate';
import DescriptionField from './DescriptionField';
import FieldTemplate from './FieldTemplate';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import TitleField from './TitleField';


const TEMPLATES: Partial<TemplatesType> = {
    FieldTemplate: FieldTemplate,
    ArrayFieldTemplate: ArrayFieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate as any,
    ArrayFieldItemTemplate: ArrayFieldItemTemplate,
    DescriptionFieldTemplate: DescriptionField,
    TitleFieldTemplate: TitleField,
}

export default Object.freeze(TEMPLATES);