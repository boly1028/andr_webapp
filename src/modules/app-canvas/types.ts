import { IAndromedaFormData } from "@/lib/schema/types"
import { DIRECTION } from "./appBuilderForm/connections/utils";
import { InsertComponentProps } from "./leftSidebar/InsertComponent";

export interface IFormRefs {
    [id: string]: IFormRef
}

export interface IFormRef {
    validate: () => void;
    formData: IAndromedaFormData;
}

export interface IEditorRef {
    setLeftSidebarComponent?: (component: IUIComponents) => void;
    edgeCache?: {
        [edgeId: string]: {
            srcConnDir: DIRECTION;
            trgConnDir: DIRECTION;
        }
    }
}

export enum IUIComponents {
    INSERT = 'insert',
    ADO_LIST = 'adolist'
}

export type _InsertProps = InsertComponentProps & {
    type: IUIComponents.INSERT
}

export type IUIComponentProps = _InsertProps;