import { useCallback } from "react";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";

interface IuseDeleteNodeProps { }

const useDeleteNode = (props?: IuseDeleteNodeProps) => {
    const { updateNodeUpdater, formRefs } = useAppBuilder()
    const { deleteElements } = useReactFlow()

    const deleteNode = useCallback((name: string) => {
        deleteElements({ nodes: [{ id: name }] })
        if (formRefs.current[name]) {
            delete formRefs.current[name]
        }
        updateNodeUpdater()
    }, [deleteElements, updateNodeUpdater])

    return deleteNode
};

export default useDeleteNode;