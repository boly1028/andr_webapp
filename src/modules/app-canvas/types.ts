import { IAndromedaFormData } from "@/lib/schema/types"

export interface IFormRefs {
    [id: string]: IFormRef
}

export interface IFormRef {
    validate: () => IAndromedaFormData
}

export interface IEditorRef {
    setLeftSidebarComponent?: (component: IUIComponents) => void
    publish?: () => void;
}

export enum IUIComponents {
    INSERT = 'insert'
}