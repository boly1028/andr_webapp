import React, { FC, useMemo } from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls, MarkerType, MiniMap, NodeTypes, useEdgesState, useNodesState } from 'reactflow'
import { IEdgeData, INodeData, useAppBuilder } from './Provider'
import 'reactflow/dist/style.css';
import AppBuilderForm from '../appBuilderForm/Form';
import { Box } from '@chakra-ui/react';
import { WRAPPER_ID } from '../hooks/useGetWrapper';
import { APP_BUILDER_KEYCODES } from '../common/keyCodes';

interface AppBuilderCanvasProps {

}
const AppBuilderCanvas: FC<AppBuilderCanvasProps> = (props) => {
    const { } = props
    const [nodes, , onNodesChange] = useNodesState<INodeData>([])
    const [edges, , onEdgesChange] = useEdgesState<IEdgeData>([])
    const { formRefs } = useAppBuilder()

    const NODE_TYPES: NodeTypes = useMemo(() => {
        return {
            form: AppBuilderForm
        }
    }, [AppBuilderForm])


    return (
        <Box w='full' h='full' id={WRAPPER_ID}>
            <ReactFlow
                deleteKeyCode={APP_BUILDER_KEYCODES.DELETE}
                multiSelectionKeyCode={APP_BUILDER_KEYCODES.MULTISELECT}
                zoomActivationKeyCode={APP_BUILDER_KEYCODES.ZOOM}
                style={{ width: "100%", height: "100%", background: 'transparent' }}
                connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
                snapToGrid={true}
                snapGrid={[16, 16]}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={NODE_TYPES}
                // fitView
                zoomOnPinch={true}
                panOnScroll={true}
                zoomOnScroll={false}
                // preventScrolling={false}
                defaultEdgeOptions={{
                    'deletable': true,
                    'markerEnd': MarkerType.ArrowClosed,
                    'zIndex': 99
                }}
                // nodeOrigin={[0.5, 0.5]}
                minZoom={0.1}
                defaultViewport={{
                    x: 50,
                    y: 50,
                    zoom: 1,
                }}
                proOptions={{
                    'hideAttribution': true
                }}
                onNodesDelete={(nodes) => {
                    nodes.forEach((node) => {
                        if (formRefs.current[node.id]) {
                            delete formRefs.current[node.id]
                        }
                    })
                }}
                fitViewOptions={{
                    duration: 300
                }}
            >
                {/* <Background variant={BackgroundVariant.Dots} gap={20} size={0.75} color='#ffffff' /> */}
                {/* <MiniMap zoomable pannable /> */}
                {/* <Controls /> */}
            </ReactFlow>
        </Box>
    )
}
export default AppBuilderCanvas