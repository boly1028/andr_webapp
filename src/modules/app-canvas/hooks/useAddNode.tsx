import { IAndromedaSchemaJSON } from "@/lib/schema/types";
import { useCallback } from "react";
import { Node } from "reactflow";
import { useAppBuilder, useReactFlow, INodeData } from "../canvas/Provider";
import useGetWrapper from "./useGetWrapper";

interface IUseAddNodeProps { }

const useAddNode = (props?: IUseAddNodeProps) => {
    const { updateNodeUpdater, editorRef } = useAppBuilder()
    const { addNodes, getNodes } = useReactFlow()
    const { getCenterPosition } = useGetWrapper()

    const addNode = useCallback((schema: IAndromedaSchemaJSON, name: string, defaultNodeData: Partial<Node<INodeData>> = {}) => {
        editorRef.current.setDirty?.(true)
        schema['form-data'].$enabled = true;
        const nodes = getNodes()
        const pos = getCenterPosition()
        addNodes({
            ...defaultNodeData,
            'id': name,
            'data': {
                name: name,
                andromedaSchema: schema
            },
            'position': {
                ...pos,
                ...defaultNodeData.position
            },
            draggable: true,
            'deletable': true,
            type: 'form',
            zIndex: Math.max(defaultNodeData.zIndex ?? 0, nodes.length),
            selectable: true
        })
        updateNodeUpdater()
    }, [addNodes, updateNodeUpdater])

    return addNode
};

export default useAddNode;