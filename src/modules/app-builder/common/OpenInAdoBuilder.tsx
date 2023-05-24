import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { Box, Icon, IconButton, Tooltip, useRadio, useToast } from "@chakra-ui/react";
import React, { FC, useCallback } from "react";
import { useDownloadFlex } from "../hooks/useDownloadFlex";
import { FormInput } from "lucide-react";
import { useRouter } from "next/router";

interface OpenInAdoBuilderButtonProps { }

const OpenInAdoBuilderButton: FC<OpenInAdoBuilderButtonProps> = (props) => {
    const { } = props;
    const router = useRouter()
    const toast = useToast({
        position: "top-right",
        duration: 3000,
        isClosable: true,
    });
    const { createFlex } = useDownloadFlex()

    const handleRoute = useCallback(async () => {
        try {
            const flex = await createFlex();
            sessionStorage.setItem("ANDROMEDA_TEMPLATE", JSON.stringify(flex));
            router.push(SITE_LINKS.flexBuilderTemplate())
        } catch (err: any) {
            toast({
                title: `Error while generating flex url`,
                description: err.message,
                status: "error",
            });
            return ''
        }
    }, [createFlex, toast]);

    return (
        <Tooltip label={`Open in Ado Builder`} bg='base.white' placement='top'>
            <Box>
                <IconButton
                    color='newSystem.content.high'
                    aria-label="Fit View"
                    icon={<Icon as={FormInput} boxSize='4' />}
                    variant='ghost'
                    onClick={handleRoute}
                />
            </Box>
        </Tooltip>
    );
};

export default OpenInAdoBuilderButton;