import { Button, ButtonProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAppBuilder } from '../canvas/Provider'
import { usePublish } from '../hooks/usePublish'
import { useAndromedaClient } from '@/lib/andrjs'
import { useAndromedaStore } from '@/zustand/andromeda'

interface PublishButtonProps extends ButtonProps {

}
const PublishButton: FC<PublishButtonProps> = (props) => {
    const { } = props
    const { isDirty } = useAppBuilder()
    const { publishAppWithAppRename: publish } = usePublish()
    const { isLoading, isConnected } = useAndromedaStore()
    return (
        <Button isDisabled={isLoading || !isConnected || !isDirty} size='sm' variant="theme-low" {...props} onClick={publish}>
            Publish
        </Button>
    )
}
export default PublishButton