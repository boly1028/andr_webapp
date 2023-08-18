import { Button, ButtonProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAppBuilder } from '../canvas/Provider'
import { usePublish } from '../hooks/usePublish'
import { useAndromedaClient } from '@/lib/andrjs'

interface PublishButtonProps extends ButtonProps {

}
const PublishButton: FC<PublishButtonProps> = (props) => {
    const { } = props
    const { isDirty } = useAppBuilder()
    const { publishAppWithAppRename: publish } = usePublish()
    const { isConnected } = useAndromedaClient()
    return (
        <Button isDisabled={!isConnected || !isDirty} size='sm' colorScheme='primary' {...props} onClick={publish}>
            Publish
        </Button>
    )
}
export default PublishButton