import { IAndromedaSchemaJSON } from '@/lib/schema/types';
import React, { createContext, createRef, FC, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { addEdge, applyEdgeChanges, applyNodeChanges, Edge, Node, OnConnect, OnEdgesChange, OnNodesChange, useReactFlow as useReactFlowFromReactFLow } from 'reactflow';
import { IEditorRef, IFormRefs } from '../types';

interface AppBuilderProviderProps {
    children?: ReactNode;
}
const AppBuilderProvider: FC<AppBuilderProviderProps> = (props) => {
    const { children } = props
    const { deleteElements, addNodes } = useReactFlow()
    const [nodes, setNodes] = useState<AppBuilderContext['nodes']>([])
    const [edges, setEdges] = useState<AppBuilderContext['edges']>([])
    const formRefs = useRef<IFormRefs>({})
    const editorRef = useRef<IEditorRef>({})

    const addNode: AppBuilderContext['addNode'] = useCallback((schema, name) => {
        addNodes({
            'id': name,
            'data': {
                name: name,
                andromedaSchema: schema
            },
            'position': {
                x: 0,
                y: 0
            },
            draggable: true,
            'deletable': true,
            type: 'form'
        })
    }, [addNodes])

    const onNodesChange: AppBuilderContext['onNodesChange'] = useCallback((changes) => {
        setNodes(prev => applyNodeChanges(changes, prev))
    }, [setNodes])

    const onEdgesChange: AppBuilderContext['onEdgesChange'] = useCallback((changes) => {
        console.log(changes)
        setEdges(prev => applyEdgeChanges(changes, prev))
    }, [setEdges])

    const onEdgesConnect: AppBuilderContext['onEdgesConnect'] = useCallback((connection) => {
        console.log(connection)
        setEdges(prev => addEdge(connection, prev))
    }, [setEdges])

    const deleteNode: AppBuilderContext['deleteNode'] = useCallback((name) => {
        deleteElements({ nodes: [{ id: name }] })
        if (formRefs.current[name]) {
            delete formRefs.current[name]
        }
    }, [deleteElements])

    const value: AppBuilderContext = useMemo(() => {
        return {
            nodes,
            edges,
            addNode,
            onNodesChange,
            onEdgesChange,
            onEdgesConnect,
            deleteNode,
            formRefs,
            editorRef
        }
    }, [nodes, edges, onNodesChange, addNode, deleteNode, formRefs, editorRef, onEdgesChange, onEdgesConnect])

    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}

export interface AppBuilderContext {
    nodes: Node<INodeData>[];
    edges: Edge[];
    addNode: (schema: IAndromedaSchemaJSON, name: string) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onEdgesConnect: OnConnect;
    deleteNode: (name: string) => void;
    formRefs: React.MutableRefObject<IFormRefs>;
    editorRef: React.MutableRefObject<IEditorRef>;
}

export interface INodeData {
    name: string;
    andromedaSchema: IAndromedaSchemaJSON
}

const defaultValue: AppBuilderContext = {
    nodes: [],
    edges: [],
    addNode: () => { throw new Error("OUTSIDE COONTEXT") },
    onNodesChange: () => { throw new Error("OUTSIDE COONTEXT") },
    onEdgesChange: () => { throw new Error("OUTSIDE COONTEXT") },
    onEdgesConnect: () => { throw new Error("OUTSIDE COONTEXT") },
    deleteNode: () => { throw new Error("OUTSIDE COONTEXT") },
    formRefs: createRef<IFormRefs>() as any,
    editorRef: createRef<IEditorRef>() as any,
}
const context = createContext(defaultValue);
export const useAppBuilder = () => useContext(context)
export const useReactFlow = () => useReactFlowFromReactFLow<INodeData>();

export default AppBuilderProvider