import { parseJsonFromFile } from '@/lib/json'
import { Button, ButtonProps, Icon, Input } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import React, { FC } from 'react'
import { useImportFlex } from '../hooks/useImportFlex'

interface ImportFlexButtonProps extends ButtonProps {

}
const ImportFlexButton: FC<ImportFlexButtonProps> = (props) => {
    const { } = props
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
        <Button as='label' htmlFor='app-import-flex' leftIcon={<Icon as={Plus} boxSize='6' />} {...props}>
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
            Import Flex
        </Button>
    )
}
export default ImportFlexButton