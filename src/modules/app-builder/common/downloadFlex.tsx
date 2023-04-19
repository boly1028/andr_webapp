import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { Box, Icon, Tooltip } from '@chakra-ui/react'
import { Download } from 'lucide-react'
import React, { FC } from 'react'
import { useDownloadFlex } from '../hooks/useDownloadFlex'

interface DownloadFlexButtonProps {

}
const DownloadFlexButton: FC<DownloadFlexButtonProps> = (props) => {
    const { } = props
    const { downloadFlex } = useDownloadFlex()

    return (
        <Tooltip label='Save' bg='newSystem.base.light'>
            <Box>
                <TmpButton onClick={downloadFlex} rightIcon={<Icon as={Download} boxSize='4' />}>
                    Export
                </TmpButton>
            </Box>
        </Tooltip>
    )
}
export default DownloadFlexButton