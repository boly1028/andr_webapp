import React, { FC, useMemo } from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls, MarkerType, MiniMap, NodeTypes } from 'reactflow'
import { useAppBuilder } from './Provider'
import 'reactflow/dist/style.css';
import AppBuilderForm from '../appBuilderForm/Form';

interface AppBuilderCanvasProps {

}
const AppBuilderCanvas: FC<AppBuilderCanvasProps> = (props) => {
    const { } = props
    const { nodes, edges, onNodesChange, onEdgesChange } = useAppBuilder()

    const NODE_TYPES: NodeTypes = useMemo(() => {
        return {
            form: AppBuilderForm
        }
    }, [AppBuilderForm])

    return (
        <ReactFlow
            style={{ width: "100%", height: "100%" }}
            connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
            snapToGrid={true}
            snapGrid={[16, 16]}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={NODE_TYPES}
            fitView
            zoomOnPinch={true}
            preventScrolling={false}
            defaultEdgeOptions={{
                'deletable': true,
                'markerEnd': MarkerType.ArrowClosed,
                'zIndex': 999
            }}
        >
            <Background variant={BackgroundVariant.Dots} gap={20} size={0.75} color='#ffffff' />
            {/* <MiniMap zoomable pannable /> */}
            <Controls />
        </ReactFlow>
    )
}
export default AppBuilderCanvas