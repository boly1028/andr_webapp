import { Box, Flex } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import AppBuilderCanvas from './canvas'
import AppBuilderProvider from './canvas/Provider'
import { ReactFlowProvider } from 'reactflow'
import TopBar from './topbar'
import LeftSidebar from './leftSidebar'

interface AppBuilderEditorProps {

}
const AppBuilderEditor: FC<AppBuilderEditorProps> = (props) => {
    const { } = props
    useEffect(() => {
        /** Speacial hack to make canvas compact by reducing the font size. This will reduce all
         * rem values, so we don't need to make any extra customization for theme
         */
        // if (typeof document !== 'undefined') {
        //     const originalSize = document.documentElement.style.fontSize
        //     document.documentElement.style.fontSize = '80%'
        //     return () => {
        //         document.documentElement.style.fontSize = originalSize
        //     }
        // }
    }, [])

    return (
        <ReactFlowProvider>
            <AppBuilderProvider>
                <Flex direction='column' h='100vh' w='100vw' overflow='auto' bg='newSystem.background.900'>
                    <Box w='full' borderBottom='1px' borderColor="newSystem.border.main" >
                        <TopBar />
                    </Box>
                    <Flex direction='row' w='full' flex='1' alignItems='stretch' overflow='hidden'>
                        <Box h='full' borderRight='1px' bg='newSystem.background.800' borderColor="newSystem.border.main" >
                            <LeftSidebar />
                        </Box>
                        <Box h='full' flex='1'>
                            <AppBuilderCanvas />
                        </Box>
                        {/* <Box h='full' borderLeft='1px' borderColor="newSystem.border.main" >
                            <RightSidebar />
                        </Box> */}
                    </Flex>
                </Flex>
            </AppBuilderProvider>
        </ReactFlowProvider >
    )
}
export default AppBuilderEditor