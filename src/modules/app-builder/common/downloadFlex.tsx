import { Box, Button, Icon, Tooltip } from '@chakra-ui/react'
import { Download } from 'lucide-react'
import React, { FC } from 'react'
import { useDownloadFlex } from '../hooks/useDownloadFlex'

interface DownloadFlexButtonProps {

}
const DownloadFlexButton: FC<DownloadFlexButtonProps> = (props) => {
    const { } = props
    const { downloadFlex } = useDownloadFlex()

    return (
        <Tooltip label='Save' bg='base.light'>
            <Button onClick={downloadFlex} variant="theme-filled" size='sm' rightIcon={<Icon as={Download} boxSize='4' />}>
                Export
            </Button>
        </Tooltip>
    )
}
export default DownloadFlexButton