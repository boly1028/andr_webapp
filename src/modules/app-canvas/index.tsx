import { Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import AppBuilderCanvas from './canvas'
import AppBuilderProvider from './canvas/Provider'

interface AppBuilderEditorProps {

}
const AppBuilderEditor: FC<AppBuilderEditorProps> = (props) => {
    const { } = props

    return (
        <Box h='100vh' w='100vw' overflow='auto' bg='dark.50'>
            <AppBuilderProvider>
                <AppBuilderCanvas />
            </AppBuilderProvider>
        </Box>
    )
}
export default AppBuilderEditor