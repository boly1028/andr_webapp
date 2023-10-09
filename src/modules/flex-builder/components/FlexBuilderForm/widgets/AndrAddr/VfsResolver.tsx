import { useResolvePath } from "@/lib/andrjs/hooks/vfs/useResolvePath";
import { Button, HStack, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react"
import { useLocalElement } from "./utils";

interface Props {
    formData: string;
    paths?: string[];
}

const VfsResolver: FC<Props> = (props) => {
    const { formData = '', paths = [] } = props;
    const [path, setPath] = useState<string>(formData);
    const { data, error, isLoading, refetch } = useResolvePath(path);
    const { el: refEl } = useLocalElement(formData, paths);

    const validate = () => {
        setPath(formData);
        refetch();
    }

    if (!formData.trim()) return null;

    if (formData.startsWith('./')) {

        return (
            <HStack>
                {!refEl ? (
                    <Text color='danger.400' fontSize='xs'>Not a valid local vfs path</Text>
                ) : (
                    <Button
                        onClick={() => refEl.scrollIntoView({
                            'behavior': 'smooth',
                        })}
                        size='xs'
                        variant='ghost'
                        color='content.medium'
                        fontSize='xs'
                    >
                        Scroll to linked panel
                    </Button>
                )}
            </HStack>
        )
    }

    return (
        <HStack fontSize='xs'>
            <Button
                onClick={validate}
                isLoading={!!path && isLoading}
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