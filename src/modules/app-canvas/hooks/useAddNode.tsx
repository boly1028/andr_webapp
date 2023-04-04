import { IAndromedaSchemaJSON } from "@/lib/schema/types";
import { humanReadableUuid } from "@/lib/schema/utils";
import { getSchemaRef } from "@/modules/flex-builder/utils/schemaTransform";
import { useCallback } from "react";
import { Node } from "reactflow";
import { useAppBuilder, useReactFlow, INodeData } from "../canvas/Provider";
import useGetWrapper from "./useGetWrapper";

interface IUseAddNodeProps { }

const useAddNode = (props?: IUseAddNodeProps) => {
    const { updateNodeUpdater, editorRef } = useAppBuilder()
    const { addNodes, getNodes } = useReactFlow()
    const { getCenterPosition } = useGetWrapper()

    const addNode = useCallback((schema: IAndromedaSchemaJSON, nodeData: Partial<Node<INodeData>> = {}) => {
        editorRef.current.setDirty?.(true)
        schema['form-data'].$enabled = true;
        const nodes = getNodes()
        const pos = getCenterPosition()
        const adoType = schema.schema.$id
        const name = nodeData.id ?? humanReadableUuid(adoType, nodes.filter(node => node.data.andromedaSchema.schema.$id === adoType).length, nodes.map(node => node.id))
        addNodes({
            ...nodeData,
            id: name,
            'data': {
                name: name,
                andromedaSchema: schema
            },
            'position': {
                ...pos,
                ...nodeData.position
            },
            draggable: true,
            'deletable': true,
            type: 'form',
            zIndex: Math.max(nodeData.zIndex ?? 0, nodes.length),
            selectable: true
        })
        updateNodeUpdater()
    }, [addNodes, updateNodeUpdater])

    return addNode
};

export default useAddNode;