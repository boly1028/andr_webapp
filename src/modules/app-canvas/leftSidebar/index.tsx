import { Box } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { useAppBuilder } from '../canvas/Provider'
import RenderUiComponent from '../common/RenderUiComponent'
import { IUIComponents } from '../types'

interface LeftSidebarProps {

}
const LeftSidebar: FC<LeftSidebarProps> = (props) => {
    const { } = props
    const { editorRef } = useAppBuilder()
    const [activeComponent, setActiveComponent] = useState(IUIComponents.INSERT);

    useEffect(() => {
        editorRef.current.setLeftSidebarComponent = setActiveComponent
    }, [setActiveComponent])

    return (
        <Box w='60' p='4'>
            <RenderUiComponent component={activeComponent} />
        </Box>
    )
}
export default LeftSidebar