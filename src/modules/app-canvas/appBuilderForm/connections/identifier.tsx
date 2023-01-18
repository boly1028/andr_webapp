import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo } from "react"
import { OnConnect } from "reactflow"
import { useAppBuilder, useReactFlow } from "../../canvas/Provider"
import { IFieldRef } from "../templates/FieldTemplate"
import { debounce } from 'lodash'
import { useId } from "@chakra-ui/react"
import { DIRECTION, getPanelTargetHandlePrefix, getSourceHandlePrefix } from "./utils"

export const useIsIdentifier = (nodeId: string, fieldId: string, formData: any, ref: MutableRefObject<IFieldRef>) => {
    const edgeId = useId()
    const { deleteElements, addEdges, getNode, getEdge } = useReactFlow()
    const { nodeUpdater } = useAppBuilder()

    const isIdentifier = useMemo(() => {
        return fieldId.split('_').pop() === 'identifier'
    }, [fieldId])

    const identifierValue: string = useMemo(() => {
        return formData || ''
    }, [formData])

    const handleConnect: OnConnect = useCallback((connection) => {
        const targetNode = getNode(connection.target ?? '');
        const sourceNode = getNode(nodeId);
        if (targetNode) {
            const targetName = targetNode.data.name;
            console.log("Updating for", edgeId, connection.target)
            ref.current.onChange?.(targetName)
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
                    fieldRef: ref,
                    isIdentifier: true
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

    }, 1000), [getNode, edgeId, getEdge])

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
            console.log("Updating", fieldId, nodeId)
            debouncedUpdate(identifierValue)
        }
    }, [identifierValue, isIdentifier, nodeUpdater])


    return { isIdentifier, handleConnect, edgeId }
}