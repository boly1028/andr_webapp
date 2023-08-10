import { CliIcon } from "@/modules/common";
import { Box, Icon, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { FC, useCallback } from "react";
import useCopyCli from "../hooks/useCopyCli";

const CopyButton = dynamic(() => import('@/modules/common/components/CopyButton'), {
    ssr: false,
    suspense: false
})

interface CopyCliButtonProps { }

const CopyCliButton: FC<CopyCliButtonProps> = (props) => {
    const { } = props;
    const toast = useToast({
        position: "top-right",
        duration: 3000,
        isClosable: true,
    });
    const { instantiation } = useCopyCli()

    const handleCopy = useCallback(async () => {
        try {
            return instantiation()
        } catch (err: any) {
            toast({
                title: `Error while creating cli command`,
                description: err.message,
                status: "error",
            });
            return ''
        }
    }, [instantiation, toast]);

    return (
        <Tooltip label={`Export to CLI`} bg='base.white' placement='top'>
            <Box>
                <CopyButton text={handleCopy} variant="unstyled">
                    <IconButton
                        color='newSystem.content.high'
                        aria-label="Fit View"
                        icon={<Icon as={CliIcon} boxSize='4' />}
                        variant='ghost'
                    />
                </CopyButton>
            </Box>
        </Tooltip>
    );
};

export default CopyCliButton;