import { AppBuilder } from '@/modules/common'
import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import React, { FC } from 'react'
import { useAppBuilder } from '../canvas/Provider'

interface AppNameButtonProps extends ButtonProps {

}
const AppNameButton: FC<AppNameButtonProps> = (props) => {
    const { } = props
    const { editorRef } = useAppBuilder()
    return (
        <Button variant='ghost' fontSize='lg' leftIcon={<Icon as={AppBuilder} boxSize='6' />} {...props}>
            Untitled
        </Button>
    )
}
export default AppNameButton