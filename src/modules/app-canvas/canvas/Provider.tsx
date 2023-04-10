import { IAndromedaSchemaJSON } from '@/lib/schema/types';
import React, { createContext, createRef, FC, MutableRefObject, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useReactFlow as useReactFlowFromReactFLow } from 'reactflow';
import { IFieldRef } from '../appBuilderForm/templates/FieldTemplate';
import { IEditorRef, IFormRefs } from '../types';

interface AppBuilderProviderProps {
    children?: ReactNode;
}
const AppBuilderProvider: FC<AppBuilderProviderProps> = (props) => {
    const { children } = props

    const formRefs = useRef<IFormRefs>({})
    const editorRef = useRef<IEditorRef>({})
    const [isDirty, setIsDirty] = useState(false)
    const [nodeUpdater, setNodeUpdater] = useState<number>(0)

    const updateNodeUpdater: AppBuilderContext['updateNodeUpdater'] = useCallback(() => {
        setNodeUpdater(prev => prev + (Math.random() - 0.5))
    }, [setNodeUpdater])

    useEffect(() => {
        editorRef.current.setDirty = (dirty) => {
            setIsDirty(dirty)
        }
    }, [setIsDirty, editorRef])

    const value: AppBuilderContext = useMemo(() => {
        return {
            formRefs,
            editorRef,
            nodeUpdater,
            updateNodeUpdater,
            isDirty
        }
    }, [formRefs, editorRef, nodeUpdater, updateNodeUpdater, isDirty])

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
    isDirty: boolean;
}

export interface INodeData {
    name: string;
    andromedaSchema: IAndromedaSchemaJSON
}

export interface IEdgeData {
}

const defaultValue: AppBuilderContext = {
    formRefs: createRef<IFormRefs>() as any,
    editorRef: createRef<IEditorRef>() as any,
    nodeUpdater: 0,
    updateNodeUpdater: () => { throw new Error("OUTSIDE COONTEXT") },
    isDirty: false
}
const context = createContext(defaultValue);
export const useAppBuilder = () => useContext(context)
export const useReactFlow = () => useReactFlowFromReactFLow<INodeData, IEdgeData>();

export default AppBuilderProvider