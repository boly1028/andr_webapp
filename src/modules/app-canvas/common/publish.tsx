import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { Button, ButtonProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { usePublish } from '../hooks/usePublish'

interface PublishButtonProps extends ButtonProps {

}
const PublishButton: FC<PublishButtonProps> = (props) => {
    const { } = props
    const publish = usePublish()
    return (
        <Button as={TmpButton} size='sm' colorScheme='primary' {...props} onClick={publish}>
            Publish
        </Button>
    )
}
export default PublishButton