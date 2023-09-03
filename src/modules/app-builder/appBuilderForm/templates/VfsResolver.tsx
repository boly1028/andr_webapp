import { useResolvePath } from "@/lib/andrjs/hooks/vfs/useResolvePath";
import { QuestionIcon, WarningIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Icon, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { Check, Cross, Eye, Info, Settings, View, X, XCircle } from "lucide-react";
import React, { FC, useState } from "react"

interface Props {
    formData: string;
}

const VfsResolver: FC<Props> = (props) => {
    const { formData } = props;
    const [path, setPath] = useState<string>(formData ?? '');
    const { data, error, isLoading, refetch } = useResolvePath(path);

    const validate = () => {
        setPath(formData);
        refetch();
    }
    const tooltip = path !== formData ? 'Click to validate VFS path' : data ? `Valid path: ${data}` : 'Invalid path'

    return (
        <Tooltip label={tooltip} fontSize='xs' size='xs' textColor='dark.500'>

            {(path !== formData || isLoading) ? (
                <Button
                    as={Text}
                    variant='unstyled'
                    size='xs'
                    isLoading={isLoading}
                    onClick={validate}
                    fontSize='xs'
                    px='1' py='0.5'
                    rounded='sm'
                    cursor='pointer' bg='dark.300' color='dark.500' _hover={{ bg: 'dark.100' }}
                >
                    VFS
                </Button>
            ) : data ? (
                <Icon color='success.400' as={Check} />
            ) : (
                <Icon color='danger.400' as={WarningTwoIcon} />
            )}
        </Tooltip>
    )
}

export default VfsResolver