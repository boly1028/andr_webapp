import { useCallback } from "react";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";

interface IuseResetCanvasProps { }

const useResetCanvas = (props?: IuseResetCanvasProps) => {
    const { updateNodeUpdater, formRefs } = useAppBuilder()
    const { setNodes, setEdges } = useReactFlow()

    const deleteNode = useCallback(() => {
        setEdges([])
        setNodes([])
        formRefs.current = {}
        updateNodeUpdater()
    }, [setNodes, setEdges, updateNodeUpdater])

    return deleteNode
};

export default useResetCanvas;