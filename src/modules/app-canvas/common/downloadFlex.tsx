import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import React, { FC } from 'react'
import { useDownloadFlex } from '../hooks/useDownloadFlex'

interface DownloadFlexButtonProps extends ButtonProps {

}
const DownloadFlexButton: FC<DownloadFlexButtonProps> = (props) => {
    const { } = props
    const { downloadFlex } = useDownloadFlex()

    return (
        <Button leftIcon={<Icon as={Plus} boxSize='6' />} {...props} onClick={downloadFlex}>
            Download Flex
        </Button>
    )
}
export default DownloadFlexButton