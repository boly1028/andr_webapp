import React, { FC, useMemo } from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap, NodeTypes, ReactFlowProvider } from 'reactflow'
import { useAppBuilder } from './Provider'
import 'reactflow/dist/style.css';
import { Box, Flex } from '@chakra-ui/react';
import TopBar from './TopBar';
import AppBuilderForm from '../appBuilderForm/Form';

interface AppBuilderCanvasProps {

}
const AppBuilderCanvas: FC<AppBuilderCanvasProps> = (props) => {
    const { } = props
    const { nodes, edges, onNodesChange } = useAppBuilder()

    const NODE_TYPES: NodeTypes = useMemo(() => {
        return {
            form: AppBuilderForm
        }
    }, [AppBuilderForm])

    return (
        <ReactFlowProvider>
            <Flex direction='column' h='full' w='full'>
                <Box w='full' bg='black' borderBottom='1px' borderColor='dark.300'>
                    <TopBar />
                </Box>
                <Box w='full' flex='1'>
                    <ReactFlow
                        style={{ width: "100%", height: "100%" }}
                        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
                        snapToGrid={true}
                        snapGrid={[16, 16]}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        nodeTypes={NODE_TYPES}
                        fitView
                    >
                        <Background variant={BackgroundVariant.Dots} gap={20} size={0.75} color='#ffffff' />
                        <MiniMap zoomable pannable />
                        <Controls />
                    </ReactFlow>
                </Box>
            </Flex>
        </ReactFlowProvider>
    )
}
export default AppBuilderCanvas