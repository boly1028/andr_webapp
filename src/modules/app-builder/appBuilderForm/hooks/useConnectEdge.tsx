import { useCallback } from "react"
import { Edge, ReactFlowProps } from "reactflow"
import { IEdgeData, useAppBuilder, useReactFlow } from "../../canvas/Provider"
import { makeUniqueId } from "@apollo/client/utilities"
import { createHandlerId, extractDataFromHandler } from "../connections/utils"
import { useGetClassColor } from "@/theme/icons/classifiers"
import { ITimeoutEdgeData, useTimeoutEdgetUpdate } from "../../hooks/useTimeoutEdgeUpdate"


export const useConnectEdge = () => {
    const { addEdges, getEdges, deleteElements } = useReactFlow()
    const { editorRef, formRefs } = useAppBuilder()
    const color = useGetClassColor({ _class: 'module' })
    const timeoutEdgeUpdate = useTimeoutEdgetUpdate()

    const connect: NonNullable<ReactFlowProps['onConnect']> = useCallback((conn) => {
        const { source, sourceHandle, target, targetHandle } = conn;
        if (!source || !sourceHandle || !target || !targetHandle) return;
        const targetHandlerData = extractDataFromHandler(targetHandle);
        const sourceHandlerData = extractDataFromHandler(sourceHandle);
        editorRef.current.edgeCache = {
            ...editorRef.current.edgeCache,
            [source]: {
                ...editorRef.current.edgeCache?.[source],
                [createHandlerId(target, targetHandlerData.rjsfIdPrefix)]: [sourceHandlerData.dir, targetHandlerData.dir]
            }
        }
        const existingEdges = getEdges().filter(edge => edge.target === target && extractDataFromHandler(edge.targetHandle ?? '').rjsfIdPrefix === targetHandlerData.rjsfIdPrefix);
        deleteElements({ edges: existingEdges });
        addEdges({
            id: makeUniqueId(sourceHandle + '-' + targetHandle),
            source,
            target,
            targetHandle,
            sourceHandle,
            style: {
                stroke: color,
                strokeWidth: 2
            }
        })
        formRefs.current[target]?.fieldRefs?.[targetHandlerData.rjsfIdPrefix]?.onConnectionChange?.({ source: source });

    }, [editorRef, formRefs.current, addEdges, deleteElements])

    const disconnect = useCallback((edges: Edge<IEdgeData>[]) => {
        const cbs: ITimeoutEdgeData[] = [];
        edges.forEach(edge => {
            const { source, sourceHandle, target, targetHandle } = edge;
            if (!source || !sourceHandle || !target || !targetHandle) return;
            const targetHandlerData = extractDataFromHandler(targetHandle);
            const cb = () => {
                formRefs.current[target]?.fieldRefs?.[targetHandlerData.rjsfIdPrefix]?.onConnectionChange?.({ source: '' })
            };
            cbs.push({
                edge,
                cb
            })
        })
        timeoutEdgeUpdate(cbs)

    }, [editorRef, formRefs.current, timeoutEdgeUpdate])


    return { connect, disconnect };
}