import { IAndromedaFormData } from "@/lib/schema/types"
import { DIRECTION } from "./appBuilderForm/connections/utils";

export interface IFormRefs {
    [id: string]: IFormRef
}

export interface IFormRef {
    validate: () => void;
    formData: () => IAndromedaFormData;
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
    INSERT = 'insert'
}