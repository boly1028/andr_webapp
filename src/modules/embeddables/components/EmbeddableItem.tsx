import {
    Box, Button, Flex, Grid, Heading, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Link, Menu, MenuButton, MenuItem, MenuList, Select,
    Image,
    VStack,
    Text,
    TagCloseButton,
    TagLabel,
    Tag,
    Skeleton,
    Stack
} from "@chakra-ui/react";
import React, { FC } from "react"
import styles from './list.module.css'
import InlineStat from "./InlineStat";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
// import { MoreVertica } from "lucide-react";
import NextLink from "next/link";
import { useGetEmbeddabeleConfig } from "../hooks/useGetEmbeddableConfig";
import { EmbPublishIcon, ChainJunoIcon } from '@/modules/common';
import { MoreHorizontal } from "lucide-react";

interface Props {
    address: string;
    eKey: string;
}
const EmbeddableItem: FC<Props> = (props) => {
    const { address, eKey } = props;
    const { config: EmbeddableItem, loading } = useGetEmbeddabeleConfig(address, eKey);
    
    // if (!EmbeddableItem) return null;

    return (
        <>
            {loading && (
                <Stack>
                    <Skeleton h="20" rounded="lg" />
                    <Skeleton h="20" rounded="lg" />
                </Stack>
            )}
            {EmbeddableItem &&
                <Flex gap='16px' w='full' direction={'column'}>
                    {
                        <Flex
                            align="start"
                            gap="2"
                            className={styles.container}
                            bgColor='rgba(255, 255, 255, 0.05)'
                            justifyContent={'space-between'}
                            p='16px'
                            borderRadius={'12px'}
                            key={eKey}
                        >
                            <HStack alignItems={'flex-start'} gap='16px' pr='50px' w='360px'>
                                <Image alt='' src={'embeddable/embLandingPage.png'} />
                                <VStack alignItems={'flex-start'} justifyContent='center'>
                                    <Text fontSize={'16px'} fontWeight='500'>{EmbeddableItem.name}</Text>
                                    <Tag
                                        borderRadius='24px'
                                        variant='solid'
                                        colorScheme='green'
                                        gap='8px'
                                    >
                                        <Icon as={EmbPublishIcon} w='6px' h='6px' />
                                        <TagLabel fontSize={'12px'}>{'Published'}</TagLabel>
                                    </Tag>
                                </VStack>
                            </HStack>
                            <Box>
                                <InlineStat label="Type" value={EmbeddableItem.$type} />
                            </Box>
                            <Box>
                                <InlineStat label="Created Date" value={'--'} />
                            </Box>
                            <Box>
                                <InlineStat label="Modified Date" value={'--'} />
                            </Box>
                            <Box>
                                <Text color="dark.500" fontWeight='light' textStyle='light' fontSize='xs'>{'Chain'}</Text>
                                <HStack>
                                    <Icon as={ChainJunoIcon} />
                                    <Text color="base.white" fontWeight='medium'>{EmbeddableItem.chainId}</Text>\
                                </HStack>
                            </Box>
                            <Menu placement="bottom-end">
                                <MenuButton
                                    as={IconButton}
                                    icon={<Icon as={MoreHorizontal} boxSize={5} />}
                                    variant="link"
                                    px="0"
                                    minW="0"
                                />
                                <MenuList>
                                    <NextLink
                                        href={SITE_LINKS.embeddablesView(eKey)}
                                        passHref
                                    >
                                        <MenuItem>
                                            View
                                        </MenuItem>
                                    </NextLink>
                                    <NextLink
                                        href={SITE_LINKS.embeddablesUpdate(EmbeddableItem.$type, eKey)}
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
                    }
                </Flex>
            }
        </>
    )
}

export default EmbeddableItem