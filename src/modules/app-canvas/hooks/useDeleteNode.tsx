import { useCallback } from "react";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";

interface IuseDeleteNodeProps { }

const useDeleteNode = (props?: IuseDeleteNodeProps) => {
    const { updateNodeUpdater, formRefs } = useAppBuilder()
    const { deleteElements } = useReactFlow()

    const deleteNode = useCallback((names: string[]) => {
        deleteElements({ nodes: names.map(name => ({ 'id': name })) })
        updateNodeUpdater()
    }, [deleteElements, updateNodeUpdater])

    return deleteNode
};

export default useDeleteNode;