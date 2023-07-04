import { Box, Button, Flex, Icon, IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"
import styles from './list.module.css'
import InlineStat from "./InlineStat";
import { CopyButton, truncate } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { MoreVertical } from "lucide-react";
import NextLink from "next/link";
import { useGetEmbeddabeleConfig } from "../hooks/useGetEmbeddableConfig";

interface Props {
    address: string;
    eKey: string;
}

const EmbeddableItem: FC<Props> = (props) => {
    const { address, eKey } = props;
    const { config, loading } = useGetEmbeddabeleConfig(address, eKey);
    if (!config) return null;
    return (
        <Flex
            border="1px solid"
            borderColor="dark.300"
            p={5}
            borderRadius="lg"
            _last={{ mb: 0 }}
            direction="column"
            w='full'
        >
            <Flex
                align="start"
                gap="2"
                className={styles.container}
            >

                <Box flex={1.5}>
                    <InlineStat label="Name" value={config.name} />
                </Box>
                <Box flex={1}>
                    <InlineStat label="Key" value={eKey} />
                </Box>
                <Box>
                    <InlineStat label="Type" value={config.$type.toUpperCase()} />
                </Box>
                <Flex alignItems="center" gap="1" alignSelf="center" w='28' justifyContent='end'>
                    {/* Section for Action List */}
                    <Box className={styles.onHover}>
                        <Link
                            target="_blank"
                            variant="link"
                            colorScheme="blue"
                            href={SITE_LINKS.embeddablePreview(`${address}--${eKey}`)}
                        >
                            View
                        </Link>
                    </Box>
                    <Menu placement="bottom-end">
                        <MenuButton
                            as={IconButton}
                            icon={<Icon as={MoreVertical} boxSize={5} />}
                            variant="link"
                            px="0"
                            minW="0"
                            className={styles.onHover}
                        />
                        <MenuList>
                            <NextLink
                                href={SITE_LINKS.embeddablesUpdate(config.$type, eKey)}
                                passHref
                            >
                                <MenuItem>
                                    Update
                                </MenuItem>
                            </NextLink>
                            <MenuItem>
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default EmbeddableItem