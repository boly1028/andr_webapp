import {
    Box, Button, Flex, Grid, Heading, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Link, Menu, MenuButton, MenuItem, MenuList, Select,
    Image,
    VStack,
    Text,
    TagCloseButton,
    TagLabel,
    Tag
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"
import styles from './list.module.css'
import InlineStat from "./InlineStat";
import { CopyButton, SearchIcon, truncate } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
// import { MoreVertica } from "lucide-react";
import NextLink from "next/link";
import { useGetEmbeddabeleConfig } from "../hooks/useGetEmbeddableConfig";
// import { AssetSortAdoType } from "@/lib/graphql/hooks/assets/ado.enum";
import { EmbPublishIcon, ChainJunoIcon } from '@/modules/common';
import { MoreHorizontal } from "lucide-react";

interface Props {
    address: string;
    eKey: string;
}
const embeddableList = [
    { embImg: 'embeddable/embLandingPage.png', embName: 'My NFT Embeddable', status: 'Published', type: 'CW20', c_dt: 'Mar 12 2022', m_dt: '15 min ago', chain: 'Juno' },
    { embImg: 'embeddable/embLandingPage.png', embName: 'Marketplace', status: 'Published', type: 'Auction', c_dt: 'Mar 12 2022', m_dt: '15 min ago', chain: 'Stargaze' },
]
const EmbeddableItem: FC<Props> = (props) => {
    const { address, eKey } = props;
    const { config, loading } = useGetEmbeddabeleConfig(address, eKey);
    if (!config) return null;
    const searchAndFilterHandler = (event, type: string) => {
        // write method definition here
    }
    return (
        <Flex w='full' gap='24px' direction={'column'}>
            <HStack>
                <Heading textAlign={'start'} fontWeight='600' fontSize={'24px'}>My embeddables</Heading>
            </HStack>
            <Grid mb='24px' gap='8px' gridTemplateColumns={'86% 14%'}>
                <Box h='40px'>
                    <InputGroup borderRadius={'8px'}>
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='gray.300' />
                        </InputLeftElement>
                        <Input type='tel' placeholder='Search embeddables'
                            onChange={(event: React.FormEvent<HTMLInputElement>) => searchAndFilterHandler(event, 'Search')}
                        />
                    </InputGroup>
                </Box>
                <Select size='sm' h='40px' borderRadius='8px' placeholder="Sort by"
                    onChange={(event) => { searchAndFilterHandler(event, 'SortBy') }}>
                    <option value='Asc'>Asc</option>
                    <option value='Desc'>Desc</option>
                </Select>
            </Grid>
            <Flex gap='16px' w='full' direction={'column'}>
                {
                    embeddableList.map((item, index) => {
                        return (
                            <Flex
                                align="start"
                                gap="2"
                                className={styles.container}
                                bgColor='rgba(255, 255, 255, 0.05)'
                                justifyContent={'space-between'}
                                p='16px'
                                borderRadius={'12px'}
                                key={index}
                            >
                                <HStack alignItems={'flex-start'} gap='16px' pr='50px' w='360px'>
                                    <Image alt='' src={item.embImg} />
                                    <VStack alignItems={'flex-start'} justifyContent='center'>
                                        <Text fontSize={'16px'} fontWeight='500'>{item.embName}</Text>
                                        <Tag
                                            borderRadius='24px'
                                            variant='solid'
                                            colorScheme='green'
                                            gap='8px'
                                        >
                                            <Icon as={EmbPublishIcon} w='6px' h='6px' />
                                            <TagLabel fontSize={'12px'}>{item.status}</TagLabel>
                                        </Tag>
                                    </VStack>
                                </HStack>
                                <Box>
                                    <InlineStat label="Type" value={item.type} />
                                </Box>
                                <Box>
                                    <InlineStat label="Created Date" value={item.c_dt} />
                                </Box>
                                <Box>
                                    <InlineStat label="Modified Date" value={item.m_dt} />
                                </Box>
                                <Box>
                                    <Text color="dark.500" fontWeight='light' textStyle='light' fontSize='xs'>{'Chain'}</Text>
                                    <HStack>
                                        <Icon as={ChainJunoIcon} />
                                        <Text color="base.white" fontWeight='medium'>{item.chain}</Text>\
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
                                            href={SITE_LINKS.embeddablesView(config.$type)}
                                            passHref
                                        >
                                            <MenuItem>
                                                View
                                            </MenuItem>
                                        </NextLink>
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
                        )
                    })
                }
            </Flex>


            {/* <Flex
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
                    //Section for Action List
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
                                // icon={<Icon as={MoreVertical} boxSize={5} />}
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
            </Flex> */}
        </Flex>
    )
}

export default EmbeddableItem