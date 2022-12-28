import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import React, { FC } from 'react'
import { useAppBuilder } from '../canvas/Provider'
import { IUIComponents } from '../types'

interface InsertButtonProps extends ButtonProps {

}
const InsertButton: FC<InsertButtonProps> = (props) => {
    const { } = props
    const { editorRef } = useAppBuilder()

    const handleClick = () => {
        editorRef.current.setLeftSidebarComponent?.(IUIComponents.INSERT)
    }
    return (
        <Button leftIcon={<Icon as={Plus} boxSize='6' />} {...props} onClick={handleClick}>
            Insert
        </Button>
    )
}
export default InsertButton