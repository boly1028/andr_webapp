import { IAndromedaSchemaJSON } from '@/lib/schema/types';
import React, { createContext, createRef, FC, MutableRefObject, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { Edge, Node, OnEdgesChange, OnNodesChange, useEdgesState, useNodesState, useReactFlow as useReactFlowFromReactFLow } from 'reactflow';
import { IFieldRef } from '../appBuilderForm/templates/FieldTemplate';
import { IEditorRef, IFormRefs } from '../types';

interface AppBuilderProviderProps {
    children?: ReactNode;
}
const AppBuilderProvider: FC<AppBuilderProviderProps> = (props) => {
    const { children } = props

    const formRefs = useRef<IFormRefs>({})
    const editorRef = useRef<IEditorRef>({})
    const [nodeUpdater, setNodeUpdater] = useState<number>(0)

    const updateNodeUpdater: AppBuilderContext['updateNodeUpdater'] = useCallback(() => {
        setNodeUpdater(prev => prev + (Math.random() - 0.5))
    }, [setNodeUpdater])


    const value: AppBuilderContext = useMemo(() => {
        return {
            formRefs,
            editorRef,
            nodeUpdater,
            updateNodeUpdater,
        }
    }, [formRefs, editorRef, nodeUpdater, updateNodeUpdater])

    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}

export interface AppBuilderContext {
    formRefs: React.MutableRefObject<IFormRefs>;
    editorRef: React.MutableRefObject<IEditorRef>;
    nodeUpdater: number;
    updateNodeUpdater: () => void;
}

export interface INodeData {
    name: string;
    andromedaSchema: IAndromedaSchemaJSON
}

export interface IEdgeData {
    fieldRef: MutableRefObject<IFieldRef>;
    isIdentifier: boolean;
}

const defaultValue: AppBuilderContext = {
    formRefs: createRef<IFormRefs>() as any,
    editorRef: createRef<IEditorRef>() as any,
    nodeUpdater: 0,
    updateNodeUpdater: () => { throw new Error("OUTSIDE COONTEXT") },
}
const context = createContext(defaultValue);
export const useAppBuilder = () => useContext(context)
export const useReactFlow = () => useReactFlowFromReactFLow<INodeData, IEdgeData>();

export default AppBuilderProvider