import { useCallback } from "react";
import { useReactFlow } from "../canvas/Provider";
import { useConnectEdge } from "../appBuilderForm/hooks/useConnectEdge";

interface IUseDeleteEdgesProps { }

const useDeleteEdges = (props?: IUseDeleteEdgesProps) => {
    const { deleteElements, getEdges } = useReactFlow()
    const { disconnect } = useConnectEdge()

    const deleteEdges = useCallback((ids: string[]) => {
        const edges = getEdges();
        const edgesToDelete = edges.filter(edge => ids.includes(edge.id));
        disconnect(edgesToDelete)
        deleteElements({ edges: edgesToDelete })
    }, [deleteElements, disconnect, getEdges])

    return deleteEdges
};

export default useDeleteEdges;