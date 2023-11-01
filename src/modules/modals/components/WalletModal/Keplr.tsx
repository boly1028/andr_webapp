import {
    BROWSER_ICONS,
    BROWSER_LINKS,
    KEPLR_LINK,
    SUPPORTED_BROSWERS,
} from "@/lib/browser/constants";
import { useGetBrowser } from "@/lib/browser/hooks/useGetBrowser";
import { BROWSER_TYPE } from "@/lib/browser/types";
import {
    KeplrConnectionStatus,
    connectAndromedaClient,
    useAndromedaStore,
} from "@/zustand/andromeda";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    AspectRatio,
    Box,
    Button,
    HStack,
    Icon,
    IconButton,
    Image,
    Link,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

const KeplrWallet: FC<Props> = (props) => {
    const { children } = props;
    const { keplrStatus } = useAndromedaStore();
    const browser = useGetBrowser();
    const isSupported = SUPPORTED_BROSWERS.includes(browser as any);

    if (keplrStatus !== KeplrConnectionStatus.NotInstalled)
        return <>{children}</>;

    if (isSupported) return (
        <HStack alignItems="start" spacing={6}>
            <Image src="/keplr.png" h="24" />
            <VStack spacing={0.5} alignItems="start" flex={1}>
                <Text textStyle="main-lg-medium">
                    KEPLR WALLET
                </Text>
                <Text textStyle="main-sm-regular" color='content.medium'>
                    Install keplr wallet to get started
                </Text>
                <Button
                    as="a"
                    target="_blank"
                    href={KEPLR_LINK}
                    aria-label="install-keplr"
                    variant="theme-low"
                    size='sm'
                    mt='2'
                >
                    Install
                </Button>
            </VStack>
        </HStack>
    )

    return (
        <VStack spacing={3}>
            <Text textStyle="main-md-medium">
                Use Keplr Supported Browser
            </Text>
            <SupportedBrowserLinks />
            {isSupported && (
                <HStack>
                    <Text textStyle="main-sm-regular" color="content.medium">KEPLR</Text>
                    <Image src="/keplr.png" h="4" />
                </HStack>
            )}
        </VStack>
    );
};

const SupportedBrowserLinks: FC = (props) => {
    const { } = props;
    return (
        <HStack>
            {SUPPORTED_BROSWERS.map((browser) => (
                <Tooltip key={browser} label={browser} openDelay={500}>
                    <IconButton
                        as='a'
                        aria-label={`install-${browser}`}
                        icon={<Image src={BROWSER_ICONS[browser]} w='10' h='10' />}
                        w="16"
                        h='16'
                        rounded="xl"
                        href={BROWSER_LINKS[browser]}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        transform="auto"
                        transition="all"
                        _hover={{
                            scale: "105%"
                        }}
                        variant="theme-outline"
                    />
                </Tooltip>
            ))}
        </HStack>
    );
};

export default KeplrWallet;
