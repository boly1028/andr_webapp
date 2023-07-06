import { IAndromedaFormData, IAndromedaSchemaJSON } from "@/lib/schema/types";
import { DIRECTION } from "./appBuilderForm/connections/utils";
import { AdoListProps } from "./leftSidebar/AdoList";
import { InsertComponentProps } from "./leftSidebar/InsertComponent";
import { TemplateListProps } from "./leftSidebar/TemplateList";

export interface IFormRefs {
    [id: string]: IFormRef;
}

export interface IFormRef {
    validate: () => void;
    formData: IAndromedaFormData;
    updateFormData: (data: IAndromedaFormData) => void;
    fieldRefs: {
        [idPrefix: string]: {
            onConnectionChange?: (data: { source: string }) => void;
        }
    }
}

export interface IEditorRef {
    setLeftSidebarComponent?: (props: IUIComponentProps) => void;
    edgeCache?: {
        [nodeId: string]: {
            [target: string]: [DIRECTION, DIRECTION];
        };
    };
    setAppName?: (name: string) => void;
    getAppName?: () => string;
    setDirty?: (dirty: boolean) => void;
    rfWrapperInstance?: HTMLDivElement;
}

export enum IUIComponents {
    INSERT = "insert",
    ADO_LIST = "adolist",
    TEMPLATE_LIST = "templatelist",
}

export type _InsertProps = InsertComponentProps & {
    type: IUIComponents.INSERT;
};

export type _AdoListProps = AdoListProps & {
    type: IUIComponents.ADO_LIST;
};

export type _TemplateListProps = TemplateListProps & {
    type: IUIComponents.TEMPLATE_LIST;
};

export type IUIComponentProps =
    | _InsertProps
    | _AdoListProps
    | _TemplateListProps;


// DRAG DROP TYPES
export enum RF_DRAG_KEYS {
    SCHEMA = 'application/reactflow/schema'
}

export interface RF_DRAG_KEYS_TYPE {
    [RF_DRAG_KEYS.SCHEMA]: string;
}
