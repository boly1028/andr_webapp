import { Box, Flex } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import AppBuilderCanvas from './canvas'
import AppBuilderProvider from './canvas/Provider'
import { ReactFlowProvider } from 'reactflow'
import TopBar from './topbar'
import LeftSidebar from './leftSidebar'
import Sidebar from '../common/components/sidebar'
import { ILinkItemKey } from '../common/components/sidebar/utils'
import { toggleSidebar } from '@/zustand/appState'

interface AppBuilderEditorProps {

}
const AppBuilderEditor: FC<AppBuilderEditorProps> = (props) => {
    const { } = props
    useEffect(() => {
        toggleSidebar(true);
    }, [])
    return (
        <ReactFlowProvider>
            <AppBuilderProvider>
                <Flex>
                    <Sidebar
                        activeLink={ILinkItemKey.APP_BUILDER}
                        pos="relative"
                        borderRight='1px'
                        borderColor='border.main'
                        h='100vh'
                    />
                    <Flex direction='column' h='100vh' w='100vw' overflow='auto' bg='background.900'>
                        <Box w='full' borderBottom='1px' borderColor="border.main" >
                            <TopBar />
                        </Box>
                        <Flex direction='row' w='full' flex='1' alignItems='stretch' overflow='hidden'>
                            <Box h='full' borderRight='1px' bg='background.800' borderColor="border.main" >
                                <LeftSidebar />
                            </Box>
                            <Box h='full' flex='1'>
                                <AppBuilderCanvas />
                            </Box>
                            {/* <Box h='full' borderLeft='1px' borderColor="border.main" >
                            <RightSidebar />
                        </Box> */}
                        </Flex>
                    </Flex>
                </Flex>
            </AppBuilderProvider>
        </ReactFlowProvider >
    )
}
export default AppBuilderEditor