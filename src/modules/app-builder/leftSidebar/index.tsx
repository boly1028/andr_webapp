import { Box } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { useAppBuilder } from '../canvas/Provider'
import RenderUiComponent from '../common/RenderUiComponent'
import { IUIComponentProps, IUIComponents } from '../types'

interface LeftSidebarProps {
}
const LeftSidebar: FC<LeftSidebarProps> = (props) => {
    const { } = props
    const { editorRef } = useAppBuilder()
    const [activeComponent, setActiveComponent] = useState<IUIComponentProps>({
        type: IUIComponents.INSERT
    });

    useEffect(() => {
        editorRef.current.setLeftSidebarComponent = setActiveComponent
    }, [setActiveComponent])

    return (
        <Box w='20vw' maxW='16rem' p='4' overflow='auto' h='full'>
            <RenderUiComponent {...activeComponent} />
        </Box>
    )
}
export default LeftSidebar