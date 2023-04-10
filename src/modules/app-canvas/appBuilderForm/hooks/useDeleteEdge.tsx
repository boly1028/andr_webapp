import { useCallback } from "react"
import { ReactFlowProps } from "reactflow"
import { useAppBuilder } from "../../canvas/Provider"
import { extractDataFromHandler } from "../connections/utils"


export const useDeleteEdge = () => {
    const { formRefs } = useAppBuilder()
    const onDelete: NonNullable<ReactFlowProps['onEdgesDelete']> = useCallback((edges) => {
        edges.forEach((edge,idx)=>{
            const targetHandlerData = extractDataFromHandler(edge.targetHandle ?? '')
            // Change the value of identifier field. All effects will run automatically and link new node based on that
            const tId = setTimeout(() => {
                formRefs?.current[targetHandlerData.nodeId]?.fieldRefs?.[targetHandlerData.rjsfIdPrefix]?.onConnectionChange?.({ source: '' });
            }, idx * 200);
        })
    }, [formRefs.current])

    return { onDelete };
}