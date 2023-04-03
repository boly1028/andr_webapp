import { useWallet } from '@/lib/wallet'
import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { Button, ButtonProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAppBuilder } from '../canvas/Provider'
import { usePublish } from '../hooks/usePublish'

interface PublishButtonProps extends ButtonProps {

}
const PublishButton: FC<PublishButtonProps> = (props) => {
    const { } = props
    const { isDirty } = useAppBuilder()
    const { publishAppWithAppRename: publish } = usePublish()
    const wallet = useWallet()
    return (
        <Button isDisabled={!wallet?.address || !isDirty} as={TmpButton} size='sm' colorScheme='primary' {...props} onClick={publish}>
            Publish
        </Button>
    )
}
export default PublishButton