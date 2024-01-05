import {
    Box, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList,
    Image,
    VStack,
    Text,
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
import { useQueryChainConfig } from "@/lib/graphql/hooks/chain/useChainConfig";
import { useDeleteEmbeddable } from "../hooks/useDeleteEmbeddable";

interface Props {
    ekey: string;
}
const EmbeddableItem: FC<Props> = (props) => {
    const { ekey } = props;
    const { config, loading } = useGetEmbeddabeleConfig(ekey);

    const { data: chainConfig } = useQueryChainConfig(config?.chainId ?? '');

    const deleteKey = useDeleteEmbeddable();

    return <>
        {loading && (
            <Stack>
                <Skeleton h="20" rounded="lg" />
                <Skeleton h="20" rounded="lg" />
            </Stack>
        )}
        {config &&
            <Flex
                align="start"
                gap="2"
                className={styles.container}
                bgColor='rgba(255, 255, 255, 0.05)'
                justifyContent={'space-between'}
                p='16px'
                borderRadius={'12px'}
            >
                <HStack alignItems={'flex-start'} gap='16px' pr='50px' flex={1}>
                    <Image
                        src={chainConfig?.iconUrls.sm}
                        alignSelf="center"
                    />
                    <VStack alignItems={'flex-start'} justifyContent='center' spacing={0}>
                        <Text textStyle="main-md-medium">{config.name}</Text>
                        <Tag
                            borderRadius='24px'
                            variant='solid'
                            colorScheme='green'
                            gap='8px'
                            mt='2'
                        >
                            <Icon as={EmbPublishIcon} w='6px' h='6px' />
                            <TagLabel fontSize={'12px'}>{config.key}</TagLabel>
                        </Tag>
                    </VStack>
                </HStack>
                <Box w='16'>
                    <InlineStat label="Type" value={config.$type.toUpperCase()} />
                </Box>
                <Box flex={1}>
                    <InlineStat label="Created Date" value={config.createdDate ?? '-'} />
                </Box>
                <Box flex={1}>
                    <InlineStat label="Modified Date" value={config.modifiedDate ?? '-'} />
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
                        <NextLink href={SITE_LINKS.embeddablesView(ekey)} passHref legacyBehavior>
                            <MenuItem>
                                View
                            </MenuItem>
                        </NextLink>
                        <NextLink
                            href={SITE_LINKS.embeddablesUpdate(config.$type, ekey)}
                            passHref
                            legacyBehavior>
                            <MenuItem>
                                Update
                            </MenuItem>
                        </NextLink>
                        <MenuItem onClick={() => deleteKey(config.key)}>
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        }
    </>;
}

export default EmbeddableItem