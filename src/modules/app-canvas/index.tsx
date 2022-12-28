import { Box, Flex } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import AppBuilderCanvas from './canvas'
import AppBuilderProvider from './canvas/Provider'
import { ReactFlowProvider } from 'reactflow'
import TopBar from './topbar'
import LeftSidebar from './leftSidebar'
import RightSidebar from './rightSidebar'

interface AppBuilderEditorProps {

}
const AppBuilderEditor: FC<AppBuilderEditorProps> = (props) => {
    const { } = props
    useEffect(() => {
        /** Speacial hack to make canvas compact by reducing the font size. This will reduce all
         * rem values, so we don't need to make any extra customization for theme
         */
        if (typeof document !== 'undefined') {
            const originalSize = document.documentElement.style.fontSize
            document.documentElement.style.fontSize = '80%'
            return () => {
                document.documentElement.style.fontSize = originalSize
            }
        }
    }, [])

    return (
        <ReactFlowProvider>
            <AppBuilderProvider>
                <Flex direction='column' h='100vh' w='100vw' overflow='auto' bg='dark.50'>
                    <Box w='full' borderBottom='1px' borderColor='dark.300'>
                        <TopBar />
                    </Box>
                    <Flex direction='row' w='full' flex='1'>
                        <Box h='full' borderRight='1px' borderColor='dark.300'>
                            <LeftSidebar />
                        </Box>
                        <Box h='full' flex='1'>
                            <AppBuilderCanvas />
                        </Box>
                        <Box h='full' borderLeft='1px' borderColor='dark.300'>
                            <RightSidebar />
                        </Box>
                    </Flex>
                </Flex>
            </AppBuilderProvider>
        </ReactFlowProvider >
    )
}
export default AppBuilderEditor