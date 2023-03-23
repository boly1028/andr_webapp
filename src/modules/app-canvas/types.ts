import { IAndromedaFormData } from "@/lib/schema/types"
import { DIRECTION } from "./appBuilderForm/connections/utils";
import { AdoListProps } from "./leftSidebar/AdoList";
import { InsertComponentProps } from "./leftSidebar/InsertComponent";
import { TemplateListProps } from "./leftSidebar/TemplateList";

export interface IFormRefs {
    [id: string]: IFormRef
}

export interface IFormRef {
    validate: () => void;
    formData: IAndromedaFormData;
}

export interface IEditorRef {
    setLeftSidebarComponent?: (props: IUIComponentProps) => void;
    edgeCache?: {
        [edgeId: string]: {
            srcConnDir: DIRECTION;
            trgConnDir: DIRECTION;
        }
    }
}

export enum IUIComponents {
    INSERT = 'insert',
    ADO_LIST = 'adolist',
    TEMPLATE_LIST = 'templatelist'
}

export type _InsertProps = InsertComponentProps & {
    type: IUIComponents.INSERT
}

export type _AdoListProps = AdoListProps & {
    type: IUIComponents.ADO_LIST
}

export type _TemplateListProps = TemplateListProps & {
    type: IUIComponents.TEMPLATE_LIST
}

export type IUIComponentProps = _InsertProps | _AdoListProps | _TemplateListProps;