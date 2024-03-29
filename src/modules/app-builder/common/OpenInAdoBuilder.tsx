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
            router.push(SITE_LINKS.flexBuilder(flex.id))
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
        <Tooltip label={`Open in ADO Builder`} placement='top'>
            <Box>
                <IconButton
                    aria-label="Fit View"
                    icon={<Icon as={FormInput} boxSize='4' />}
                    variant="theme-filled"
                    size='sm'
                    onClick={handleRoute}
                />
            </Box>
        </Tooltip>
    );
};

export default OpenInAdoBuilderButton;