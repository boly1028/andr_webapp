import { useResolvePath } from "@/lib/andrjs/hooks/vfs/useResolvePath";
import { Button, HStack, Text } from "@chakra-ui/react";
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

    if (!formData) return null;

    return (
        <HStack fontSize='xs'>
            <Button
                onClick={validate}
                isLoading={isLoading}
                size='xs'
                variant='ghost'
                color='content.medium'
            >
                Validate VFS Path
            </Button>
            {(path === formData) && data && (
                <Text>{data}</Text>
            )}
            {!!(error && (path === formData)) && (
                <Text color='danger.400'>Not a valid vfs path</Text>
            )}
        </HStack>
    )
}

export default VfsResolver