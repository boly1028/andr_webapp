import { parseJsonFromFile } from '@/lib/json'
import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { Box, ButtonProps, Icon, Input, Tooltip } from '@chakra-ui/react'
import { Upload } from 'lucide-react'
import React, { FC } from 'react'
import { useImportFlex } from '../hooks/useImportFlex'

interface ImportFlexButtonProps extends ButtonProps {

}
const ImportFlexButton: FC<ImportFlexButtonProps> = (props) => {
    const { children, ...buttonProps } = props

    const { importFlexFile } = useImportFlex()

    /**Handle flex file input */
    const handleFileInput = async (file: File) => {
        /**Parse content of file to JSON. If any validation is needed, this is probably a good place to add.
         * However, make it reusable as same validation will be done at template builder routes.
         */
        const json = await parseJsonFromFile(file);
        await importFlexFile(json)
    };

    return (
        <Tooltip label='Open' bg='newSystem.base.light'>
            <Box>
                <TmpButton rightIcon={<Icon as={Upload} boxSize='4' />} aria-label='import-flex' as='label' cursor='pointer' {...buttonProps}>
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
                    {children || 'Load'}
                </TmpButton>
            </Box>
        </Tooltip>
    )
}
export default ImportFlexButton