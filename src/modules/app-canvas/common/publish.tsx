import { useWallet } from '@/lib/wallet'
import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { Button, ButtonProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { usePublish } from '../hooks/usePublish'

interface PublishButtonProps extends ButtonProps {

}
const PublishButton: FC<PublishButtonProps> = (props) => {
    const { } = props
    const { handlePublish: publish } = usePublish()
    const wallet = useWallet()
    return (
        <Button isDisabled={!wallet?.address} as={TmpButton} size='sm' colorScheme='primary' {...props} onClick={publish}>
            Publish
        </Button>
    )
}
export default PublishButton