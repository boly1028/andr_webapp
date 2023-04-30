import { useCallback } from "react"
import { Edge, MarkerType, ReactFlowProps } from "reactflow"
import { IEdgeData, useAppBuilder, useReactFlow } from "../../canvas/Provider"
import { cloneDeep, makeUniqueId } from "@apollo/client/utilities"
import { createHandlerId, extractDataFromHandler } from "../connections/utils"
import { useGetClassColor } from "@/theme/icons/classifiers"


export const useConnectEdge = () => {
    const { addEdges, getEdges, setEdges } = useReactFlow()
    const { editorRef, formRefs } = useAppBuilder()
    const color = useGetClassColor({ _class: 'module' })

    const deleteEdgesWithoutTrigger = useCallback((edges: Edge<IEdgeData>[]) => {
        const allEdges = getEdges();
        console.log("DELETED EDGES", edges.map(ed => cloneDeep(ed.id)))
        setEdges(allEdges.filter(eg => !edges.some(e => e.id === eg.id)));
    }, [getEdges, setEdges])


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
        deleteEdgesWithoutTrigger(existingEdges);
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

    }, [editorRef, formRefs.current, addEdges, deleteEdgesWithoutTrigger])

    const disconnect = useCallback((edges: Edge<IEdgeData>[]) => {
        for (const edge of edges) {
            console.log('DISCONNECTNG EDGE', edge.id)
            const { source, sourceHandle, target, targetHandle } = edge;
            if (!source || !sourceHandle || !target || !targetHandle) return;
            const targetHandlerData = extractDataFromHandler(targetHandle);
            formRefs.current[target]?.fieldRefs?.[targetHandlerData.rjsfIdPrefix]?.onConnectionChange?.({ source: '' });
        }

    }, [editorRef, formRefs.current])


    return { connect, disconnect, deleteEdgesWithoutTrigger };
}