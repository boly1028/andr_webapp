import { parseJsonFromFile } from '@/lib/json'
import useConfirmationModal from '@/modules/modals/hooks/useConfirmationModal'
import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { Icon, Input, Tooltip } from '@chakra-ui/react'
import { Upload } from 'lucide-react'
import React, { FC } from 'react'
import { useImportFlex } from '../hooks/useImportFlex'

interface ImportFlexButtonProps {

}
const ImportFlexButton: FC<ImportFlexButtonProps> = (props) => {
    const { } = props
    const open = useConfirmationModal(
        'warning',
        '',
        'Opening a saved project or template will remove your current build. Do you want to proceed?', 'Open Project')
    const { importFlexFile } = useImportFlex()

    /**Handle flex file input */
    const handleFileInput = async (file: File) => {
        /**Parse content of file to JSON. If any validation is needed, this is probably a good place to add.
         * However, make it reusable as same validation will be done at template builder routes.
         */
        const json = await parseJsonFromFile(file);
        open(() => {
            importFlexFile(json)
        })
    };

    return (
        <TmpButton rightIcon={<Icon as={Upload} boxSize='5' />} aria-label='import-flex' as='label' cursor='pointer' htmlFor='app-import-flex'>
            <Input
                onChange={(e) => {
                    const file = e.target.files?.item(0);
                    if (file) {
                        handleFileInput(file);
                    }
                }}
                multiple={false}
                type="file"
                id="app-import-flex"
                // Only Allow flex file
                accept=".flex"
                srOnly
            />
            <Tooltip label='Open' bg='newSystem.base.light' mt='2'>
                Load
            </Tooltip>
        </TmpButton>
    )
}
export default ImportFlexButton