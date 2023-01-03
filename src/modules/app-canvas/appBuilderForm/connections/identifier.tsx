import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo } from "react"
import { OnConnect } from "reactflow"
import { AppBuilderContext, useAppBuilder, useReactFlow } from "../../canvas/Provider"
import { IFieldRef } from "../templates/FieldTemplate"
import { debounce } from 'lodash'
import { useId } from "@chakra-ui/react"
import { DIRECTION, getPanelTargetHandlePrefix, getSourceHandlePrefix } from "./utils"

export const useIsIdentifier = (nodeId: string, schema: any, formData: any, ref: MutableRefObject<IFieldRef>) => {
    const edgeId = useId()
    const { deleteElements, addEdges, getNode, getEdge } = useReactFlow()

    const isIdentifier = useMemo(() => {
        return !!schema?.properties?.address?.properties?.identifier
    }, [schema])

    const identifierValue: string = useMemo(() => {
        return formData?.address?.identifier ?? ''
    }, [formData])

    const handleConnect: OnConnect = useCallback((connection) => {
        const targetNode = getNode(connection.target ?? '');
        const sourceNode = getNode(nodeId);
        if (targetNode) {
            const adoType = targetNode.data.andromedaSchema.schema.$id
            const targetName = targetNode.data.name;
            ref.current.onChange?.({
                ...formData,
                address: {
                    identifier: targetName
                },
                module_type: adoType
            })
            deleteElements({
                edges: [{ id: edgeId }]
            })
            addEdges({
                id: edgeId,
                source: nodeId,
                sourceHandle: connection.sourceHandle,
                sourceNode: sourceNode,
                target: targetNode.id,
                targetHandle: connection.targetHandle,
                targetNode: targetNode,
                data: {
                    // Add any data needed for edge rendering here
                }
            })
        }
    }, [edgeId, ref, addEdges, getNode, nodeId, getEdge])


    const debouncedUpdate = useCallback(debounce((identifier: string) => {
        const targetNode = getNode(identifier)
        if (targetNode) {
            const edge = getEdge(edgeId)
            const targetHandle = (edge?.target === targetNode.id && edge.targetHandle) || getPanelTargetHandlePrefix(targetNode.id, DIRECTION.UP);
            const sourceHandle = edge?.sourceHandle || getSourceHandlePrefix(edgeId, DIRECTION.LEFT)
            handleConnect({
                'source': nodeId,
                sourceHandle: sourceHandle,
                target: targetNode.id,
                targetHandle: targetHandle
            })
        } else {
            deleteElements({
                edges: [{ id: edgeId }]
            })
        }

    }, 500), [getNode, edgeId, getEdge])

    useLayoutEffect(() => {
        if (isIdentifier) {
            return () => {
                console.log("Removing Edge", edgeId)
                deleteElements({
                    edges: [{ id: edgeId }]
                })
            }
        }
    }, [edgeId, isIdentifier])

    useEffect(() => {
        if (isIdentifier) {
            debouncedUpdate(identifierValue)
        }
    }, [identifierValue, isIdentifier])


    return { isIdentifier, handleConnect, edgeId }
}