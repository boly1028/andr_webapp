import { AppBuilder } from '@/modules/common'
import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { Icon } from '@chakra-ui/react'
import React, { FC } from 'react'

interface AppNameButtonProps {

}
const AppNameButton: FC<AppNameButtonProps> = (props) => {
    const { } = props
    return (
        <TmpButton
            fontSize='md' leftIcon={<Icon as={AppBuilder} boxSize='5' />}
        >
            Untitled
        </TmpButton>
    )
}
export default AppNameButton