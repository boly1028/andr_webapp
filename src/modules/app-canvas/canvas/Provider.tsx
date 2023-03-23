import { IAndromedaSchemaJSON } from '@/lib/schema/types';
import React, { createContext, createRef, FC, MutableRefObject, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { addEdge, applyEdgeChanges, applyNodeChanges, Edge, Node, OnConnect, OnEdgesChange, OnNodesChange, useEdgesState, useNodesState, useReactFlow as useReactFlowFromReactFLow } from 'reactflow';
import { IFieldRef } from '../appBuilderForm/templates/FieldTemplate';
import { IEditorRef, IFormRefs } from '../types';

interface AppBuilderProviderProps {
    children?: ReactNode;
}
const AppBuilderProvider: FC<AppBuilderProviderProps> = (props) => {
    const { children } = props
    const { deleteElements, addNodes, getNode } = useReactFlow()
    const [nodes, setNodes, onNodesChange] = useNodesState<INodeData>([])
    const [edges, setEdges, onEdgesChange] = useEdgesState<IEdgeData>([])
    const formRefs = useRef<IFormRefs>({})
    const editorRef = useRef<IEditorRef>({})
    const [nodeUpdater, setNodeUpdater] = useState<number>(0)

    const addNode: AppBuilderContext['addNode'] = useCallback((schema, name, defaultNodeData = {}) => {
        addNodes({
            ...defaultNodeData,
            'id': name,
            'data': {
                name: name,
                andromedaSchema: schema
            },
            'position': defaultNodeData.position ?? {
                x: 0,
                y: 0
            },
            draggable: true,
            'deletable': true,
            type: 'form',
            zIndex: defaultNodeData.zIndex ?? 0,
            selectable: false
        })
        setNodeUpdater(prev => prev + (Math.random() - 0.5))
    }, [addNodes, setNodeUpdater])

    const reset: AppBuilderContext['reset'] = useCallback(() => {
        setNodes([])
    }, [setNodes])


    const deleteNode: AppBuilderContext['deleteNode'] = useCallback((name) => {
        deleteElements({ nodes: [{ id: name }] })
        if (formRefs.current[name]) {
            delete formRefs.current[name]
        }
        setNodeUpdater(prev => prev + (Math.random() - 0.5))
    }, [deleteElements, setNodeUpdater])

    const renameNode: AppBuilderContext['renameNode'] = useCallback((nodeId, newNodeId) => {
        const oldNode = getNode(nodeId);
        const isNewNodePresent = getNode(newNodeId);
        if (!oldNode) throw new Error("Node not present");
        if (isNewNodePresent) throw new Error(`Node with id: ${newNodeId} already present`)
        const formData = formRefs.current[nodeId]?.formData
        // Add New Node with latest nodeId
        oldNode.data.andromedaSchema['form-data'] = formData
        addNode(oldNode.data.andromedaSchema, newNodeId, oldNode)

        // Now we want to update formData of all incoming edges for the old node.
        // Why Incoming? Because incoming edges are linked to the nodes while outgoing are linked to fields
        const edgesData = edges.filter(edge => edge.target === nodeId).map(edge => edge.data);
        edgesData.reverse().forEach((edgeData, idx) => {
            if (!edgeData) return;
            if (edgeData.isIdentifier) {
                // Change the value of identifier field. All effects will run automatically and link new node based on that
                const tId = setTimeout(() => {
                    edgeData?.fieldRef?.current?.onChange?.(newNodeId)
                }, idx * 200);
                // We need timeout of 200 between each onChange call because rjsf pools all the onChange and only execute the last one
                // TODO: Smart Pooling: Pool only onChange for a single node because different nodes are different rjsf instance and do not need pooling
                // TODO: Change execution to asyn await so that rename function will wait until all execution is complete
            }
        })

        // Now we want to update our edges by deleting the edges which originated from current node  and also delete current node
        deleteElements({ edges: edges.filter(edge => edge.source === nodeId) })
        deleteNode(nodeId)
    }, [deleteElements, deleteNode, addNode, getNode, setEdges, edges])

    const value: AppBuilderContext = useMemo(() => {
        return {
            nodes,
            edges,
            addNode,
            onNodesChange,
            onEdgesChange,
            deleteNode,
            formRefs,
            editorRef,
            renameNode,
            nodeUpdater,
            reset
        }
    }, [nodes, edges, onNodesChange, addNode, deleteNode, formRefs, editorRef, onEdgesChange, renameNode, nodeUpdater, reset])

    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}

export interface AppBuilderContext {
    nodes: Node<INodeData>[];
    edges: Edge<IEdgeData>[];
    addNode: (schema: IAndromedaSchemaJSON, name: string, nodeData?: Partial<Node<INodeData>>) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    deleteNode: (name: string) => void;
    formRefs: React.MutableRefObject<IFormRefs>;
    editorRef: React.MutableRefObject<IEditorRef>;
    renameNode: (nodeId: string, newNodeId: string) => void;
    nodeUpdater: number;
    reset: () => void;
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
    nodes: [],
    edges: [],
    addNode: () => { throw new Error("OUTSIDE COONTEXT") },
    onNodesChange: () => { throw new Error("OUTSIDE COONTEXT") },
    onEdgesChange: () => { throw new Error("OUTSIDE COONTEXT") },
    deleteNode: () => { throw new Error("OUTSIDE COONTEXT") },
    formRefs: createRef<IFormRefs>() as any,
    editorRef: createRef<IEditorRef>() as any,
    renameNode: () => { throw new Error("OUTSIDE COONTEXT") },
    reset: () => { throw new Error("OUTSIDE COONTEXT") },
    nodeUpdater: 0,
}
const context = createContext(defaultValue);
export const useAppBuilder = () => useContext(context)
export const useReactFlow = () => useReactFlowFromReactFLow<INodeData, IEdgeData>();

export default AppBuilderProvider