import React from "react";
import {
    Box,
    BoxProps,
    Flex,
    CloseButton,
    Image,
    Divider,
    Text,
    Avatar,
    IconButton,
    Icon,
    ButtonProps,
} from "@chakra-ui/react";

import NavItem from "./NavItem";
import {
    BookOpenIcon,
    CubeIcon,
    SparklesIcon,
    FolderOpenIcon,
    AppBuilder,
    CliIcon,
    CodeBrowser,
} from "../icons";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import Link from "next/link";
import { ILinkItemKey } from "./utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { toggleSidebar, useAppStateStore } from "@/zustand/appState";

interface ILinkItem {
    name: string;
    icon: ButtonProps['leftIcon'];
    href: string;
    key: ILinkItemKey;
}
const LinkItems: ILinkItem[] = [
    {
        name: "User",
        icon: <Avatar boxSize={5} />,
        href: SITE_LINKS.userHome(),
        key: ILinkItemKey.USER,
    },
    {
        name: "Learn",
        icon: <BookOpenIcon boxSize={5} />,
        href: SITE_LINKS.learn(),
        key: ILinkItemKey.LEARN,
    },
    {
        name: "ADO Builder",
        icon: <CubeIcon boxSize={5} />,
        href: SITE_LINKS.flexBuilderHome(),
        key: ILinkItemKey.ADO_BUILDER,
    },
    {
        name: "App Builder",
        icon: <AppBuilder boxSize={5} />,
        href: SITE_LINKS.appBuilder(),
        key: ILinkItemKey.APP_BUILDER,
    },
    {
        name: "Assets",
        icon: <FolderOpenIcon boxSize={5} />,
        href: SITE_LINKS.assets(),
        key: ILinkItemKey.ASSETS,
    },
    {
        name: "Embeddables",
        icon: <CodeBrowser boxSize={5} />,
        href: SITE_LINKS.embeddables(),
        key: ILinkItemKey.EMBEDDABLES,
    },
    {
        name: "App Store",
        icon: <SparklesIcon boxSize={5} />,
        href: SITE_LINKS.appStore(),
        key: ILinkItemKey.APP_STORE,
    },
    {
        name: "CLI",
        icon: <CliIcon boxSize={5} />,
        href: SITE_LINKS.cli(),
        key: ILinkItemKey.CLI,
    },
];

interface SidebarProps extends BoxProps {
    onClose?: () => void;
    activeLink?: ILinkItemKey;
}

const Sidebar = ({ onClose, activeLink, ...props }: SidebarProps) => {
    const sidebarCollapse = useAppStateStore(state => state.sidebarCollapse);
    return (
        <Box
            display="flex"
            flexDirection="column"
            transition='all'
            transitionDuration="300ms"
            bg="background.800"
            pos="fixed"
            h="full"
            px="4"
            py="1"
            {...props}
        >
            <Flex h={20} pl={sidebarCollapse ? 0 : 2} pt={sidebarCollapse ? 2 : 0} flexDirection={sidebarCollapse ? 'column-reverse' : 'row'} alignItems="center" justifyContent="start" gap='2'>
                <Box flexShrink={0} w="7" h="7">
                    <Link href={SITE_LINKS.landing()}>
                        <Image src="/logo.png" />
                    </Link>
                </Box>
                {!sidebarCollapse && (
                    <Text textStyle="main-lg-bold" flex={1}>Andromeda</Text>
                )}
                <IconButton
                    aria-label="collapse-sidebar"
                    icon={<Icon as={sidebarCollapse ? ChevronsRight : ChevronsLeft} boxSize='4' />}
                    size='xs'
                    rounded='full'
                    colorScheme="gray"
                    bg='background.800'
                    onClick={() => toggleSidebar()}
                />
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            <Box
                display="flex"
                flexDir="column"
                gap="1"
                flex="1"
                overflowY="auto"
                pb="2"
            >
                {LinkItems.map((link) => (
                    <NavItem
                        key={link.key}
                        active={link.key === activeLink}
                        href={link.href}
                        leftIcon={link.icon}
                    >
                        {link.name}
                    </NavItem>
                ))}
            </Box>
            <Divider justifySelf="end" />
            <Text textAlign="center" my="2" textStyle="main-xs-regular" color="content.medium">
                {!sidebarCollapse ? "Andromeda App - " : ""}Beta
            </Text>
        </Box>
    );
};

export default Sidebar;
