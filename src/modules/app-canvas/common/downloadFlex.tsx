import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { Icon, Tooltip } from '@chakra-ui/react'
import { Download } from 'lucide-react'
import React, { FC } from 'react'
import { useDownloadFlex } from '../hooks/useDownloadFlex'

interface DownloadFlexButtonProps {

}
const DownloadFlexButton: FC<DownloadFlexButtonProps> = (props) => {
    const { } = props
    const { downloadFlex } = useDownloadFlex()

    return (
        <TmpButton onClick={downloadFlex} rightIcon={<Icon as={Download} boxSize='4' />}>
            <Tooltip label='Save' bg='newSystem.base.light' mt='2'>
                Export
            </Tooltip>
        </TmpButton>
    )
}
export default DownloadFlexButton