import { useCallback } from "react";
import { Edge, Node, useNodes } from "reactflow";
import { IEdgeData, INodeData, useAppBuilder, useReactFlow } from "../canvas/Provider";
import dagre from 'dagre';

interface IUseAutoLayoutProps { }

const useAutoLayout = (props?: IUseAutoLayoutProps) => {
    const { updateNodeUpdater } = useAppBuilder()
    const { setNodes, getNodes, getEdges } = useReactFlow()

    const autoLayout = useCallback(() => {
        const nodes = getNodes()
        const edges = getEdges()
        const { nodes: newNodes } = getLayoutedElements(nodes, edges)
        setNodes(newNodes)
    }, [updateNodeUpdater, getLayoutedElements])

    return autoLayout
};

export default useAutoLayout;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node<INodeData>[], edges: Edge<IEdgeData>[]) => {
    dagreGraph.setGraph({ rankdir: 'LR' });

    nodes.forEach((node) => {
        const width = node.width ?? 10;
        const height = node.height ?? 10;
        dagreGraph.setNode(node.id, { width, height });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });
    dagre.layout(dagreGraph);
    nodes.forEach((node) => {
        const width = node.width ?? 10;
        const height = node.height ?? 10;
        const nodeWithPosition = dagreGraph.node(node.id);
        node.position = {
            x: nodeWithPosition.x - width / 2,
            y: nodeWithPosition.y - height / 2,
        };

        return node;
    });
    return { nodes, edges }
};
