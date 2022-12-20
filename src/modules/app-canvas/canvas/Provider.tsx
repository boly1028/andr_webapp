import { IAndromedaSchemaJSON } from '@/lib/schema/types';
import { cloneDeep } from '@apollo/client/utilities';
import React, { createContext, createRef, FC, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { applyNodeChanges, Edge, Node, OnNodesChange } from 'reactflow';

interface AppBuilderProviderProps {
    children?: ReactNode;
}
const AppBuilderProvider: FC<AppBuilderProviderProps> = (props) => {
    const { children } = props
    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])
    const formRefs = useRef({})

    const addNode: AppBuilderContext['addNode'] = useCallback((schema, name) => {
        setNodes(prev => {
            const clone = cloneDeep(prev);
            clone.push({
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
            return clone;
        })
    }, [setNodes, setEdges])

    const onNodesChange: AppBuilderContext['onNodesChange'] = useCallback((changes) => {
        setNodes(prev => applyNodeChanges(changes, prev))
    }, [setNodes, setEdges])

    const deleteNode: AppBuilderContext['deleteNode'] = useCallback((name) => {
        /**
         * NODE Deletion will also need removal of edges whichh are source and target.
         * We can get edge list from our own implementation or helper functions which reactflow
         * provides
         */
        setNodes(prev => {
            const clone = cloneDeep(prev).filter(node => node.id !== name);
            return clone;
        })
        if (formRefs.current[name]) {
            delete formRefs.current[name]
        }
    }, [setNodes, setEdges])

    const value: AppBuilderContext = useMemo(() => {
        return {
            nodes,
            edges,
            addNode,
            onNodesChange,
            deleteNode,
            formRefs
        }
    }, [nodes, edges, onNodesChange, addNode, deleteNode, formRefs])

    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}

export interface AppBuilderContext {
    nodes: Node[];
    edges: Edge[];
    addNode: (schema: IAndromedaSchemaJSON, name: string) => void;
    onNodesChange: OnNodesChange;
    deleteNode: (name: string) => void;
    formRefs: React.MutableRefObject<any>;
}

const defaultValue: AppBuilderContext = {
    nodes: [],
    edges: [],
    addNode: () => { throw new Error("OUTSIDE COONTEXT") },
    onNodesChange: () => { throw new Error("OUTSIDE COONTEXT") },
    deleteNode: () => { throw new Error("OUTSIDE COONTEXT") },
    formRefs: createRef(),
}
const context = createContext(defaultValue);
export const useAppBuilder = () => useContext(context)

export default AppBuilderProvider