import { IAndromedaSchemaJSON } from '@/lib/schema/types';
import React, { createContext, createRef, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useReactFlow as useReactFlowFromReactFLow, useNodes as useReactFlowNodes } from 'reactflow';
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
    const [shortcutEnabled, setShortcutEnable] = useState(true)

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
            isDirty,
            shortcutEnabled,
            setShortcutEnable: (enabled) => setShortcutEnable(enabled)
        }
    }, [formRefs, editorRef, nodeUpdater, updateNodeUpdater, isDirty, shortcutEnabled, setShortcutEnable])

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
    shortcutEnabled?: boolean;
    setShortcutEnable: (enabled: boolean) => void;
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
    setShortcutEnable: () => { throw new Error("OUTSIDE COONTEXT") },
    shortcutEnabled: true,
    isDirty: false
}
const context = createContext(defaultValue);
export const useAppBuilder = () => useContext(context)
export const useReactFlow = () => useReactFlowFromReactFLow<INodeData, IEdgeData>();
export const useNodes = () => useReactFlowNodes<INodeData>();

export default AppBuilderProvider