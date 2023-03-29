import { useCallback } from "react";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";
import useAddNode from "./useAddNode";
import useDeleteNode from "./useDeleteNode";

interface IUseRenameNodeProps { }

const useRenameNode = (props?: IUseRenameNodeProps) => {
    const { formRefs } = useAppBuilder()
    const { getNode, getEdges, deleteElements } = useReactFlow()
    const addNode = useAddNode();
    const deleteNode = useDeleteNode()

    const renameNode = useCallback((nodeId: string, newNodeId: string) => {
        const oldNode = getNode(nodeId);
        const isNewNodePresent = getNode(newNodeId);
        if (!oldNode) throw new Error("Node not present");
        if (isNewNodePresent) throw new Error(`Node with id: ${newNodeId} already present`)
        const formData = formRefs.current[nodeId]?.formData
        // Add New Node with latest nodeId
        oldNode.data.andromedaSchema['form-data'] = formData
        addNode(oldNode.data.andromedaSchema, newNodeId, oldNode)

        const edges = getEdges()
        // Now we want to update formData of all incoming edges for the old node.
        // Why Incoming? Because incoming edges are linked to the nodes while outgoing are linked to fields
        const edgesData = edges.filter(edge => edge.target === nodeId).map(edge => edge.data);
        edgesData.reverse().forEach((edgeData, idx) => {
            if (!edgeData) return;
            if (edgeData.isIdentifier) {
                // Change the value of identifier field. All effects will run automatically and link new node based on that
                const tId = setTimeout(() => {
                    edgeData?.fieldRef?.current?.onChange?.(newNodeId)
                }, idx * 200);
                // We need timeout of 200 between each onChange call because rjsf pools all the onChange and only execute the last one
                // TODO: Smart Pooling: Pool only onChange for a single node because different nodes are different rjsf instance and do not need pooling
                // TODO: Change execution to asyn await so that rename function will wait until all execution is complete
            }
        })

        // Now we want to update our edges by deleting the edges which originated from current node  and also delete current node
        deleteElements({ edges: edges.filter(edge => edge.source === nodeId) })
        deleteNode([nodeId])
    }, [deleteElements, addNode, getNode])

    return renameNode
};

export default useRenameNode;