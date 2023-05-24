import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { Box, Icon, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { Link } from "lucide-react";
import dynamic from "next/dynamic";
import React, { FC, useCallback } from "react";
import useCopyCli from "../hooks/useCopyCli";
import { useDownloadFlex } from "../hooks/useDownloadFlex";

const CopyButton = dynamic(() => import('@/modules/common/components/CopyButton'), {
    ssr: false,
    suspense: false
})

interface CopyFlexUrlButtonProps { }

const CopyFlexUrlButton: FC<CopyFlexUrlButtonProps> = (props) => {
    const { } = props;
    const toast = useToast({
        position: "top-right",
        duration: 3000,
        isClosable: true,
    });
    const { generateFlexUrl } = useDownloadFlex()

    const handleCopy = useCallback(async () => {
        try {
            const url = await generateFlexUrl()
            return window.origin + SITE_LINKS.appBuilder(url);
        } catch (err: any) {
            toast({
                title: `Error while generating flex url`,
                description: err.message,
                status: "error",
            });
            return ''
        }
    }, [generateFlexUrl, toast]);

    return (
        <Tooltip label={`Copy Flex Url`} bg='base.white' placement='top'>
            <Box>
                <CopyButton text={handleCopy} variant="unstyled">
                    <IconButton
                        color='newSystem.content.high'
                        aria-label="Fit View"
                        icon={<Icon as={Link} boxSize='4' />}
                        variant='ghost'
                    />
                </CopyButton>
            </Box>
        </Tooltip>
    );
};

export default CopyFlexUrlButton;