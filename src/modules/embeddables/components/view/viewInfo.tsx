import { EmbPublishIcon, truncate } from '@/modules/common';
import { Box, Flex, HStack, Image, VStack, Text, Icon, Tag, TagLabel, Divider, Button, SkeletonText } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { CopyFilledIcon } from '@/modules/common';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import styles from './view.module.css';
import { IEmbeddableConfig } from '@/lib/schema/types/embeddables';
import { SITE_LINKS } from '@/modules/common/utils/sitelinks';
import { useAccount } from '@/lib/andrjs/hooks/useAccount';
import Link from 'next/link';

interface ViewHeaderProps {
    data: IEmbeddableConfig | undefined;
    loading: boolean;
}

const ViewInfo: FC<ViewHeaderProps> = ({ data, loading }) => {
    const account = useAccount();
    const address = account?.address ?? "";

    const previewLink = SITE_LINKS.embeddablePublished(data?.chainId ?? '', data?.key ?? '');

    return (
        <Flex gap='24px' w='full'>
            <Box w='50%' className={styles.imgContainer} position='relative'>
                <Image alt='' src={'/embeddable/embPreviewPlaceHolder.png'} h='full' />
                <Box className={styles.imgButton}>
                    <Link
                        href={previewLink}
                        target="_blank">
                        <Button size={'sm'} colorScheme='primary' rounded={'8px'} textDecoration='none'>Preview Project</Button>
                    </Link>
                </Box>
            </Box>
            <VStack
                w='50%'
                alignItems='flex-start'
                bgColor={'rgba(255, 255, 255, 0.05)'}
                p='24px'
                borderRadius={'12px'}
                gap='12px'
            >
                <VStack>
                    <HStack gap='48px'>
                        <VStack alignItems={'flex-start'} justifyContent='center'>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Status</Text>
                            <Tag
                                borderRadius='24px'
                                variant='solid'
                                bgColor='rgba(30, 201, 135, 0.12)'
                                gap='8px'
                            >
                                <Icon as={EmbPublishIcon} w='6px' h='6px' />
                                <TagLabel fontSize={'12px'} color='rgba(163, 224, 192, 1)'>{'Published'}</TagLabel>
                            </Tag>
                        </VStack>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Created By</Text>
                            <HStack>
                                <Text fontWeight='500' fontSize='14px'>{truncate(address)}
                                </Text>
                                <Icon as={CopyFilledIcon} cursor='pointer' />
                            </HStack>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack>
                    <HStack gap='48px'>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Type</Text>
                            {loading &&
                                <SkeletonText skeletonHeight="2" noOfLines={1} color='gray' />
                            }
                            <Text fontWeight='500' fontSize='14px'>{data?.$type?.toUpperCase()}</Text>
                        </VStack>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Published</Text>
                            <Text fontWeight='500' fontSize='14px'>Mmm DD, YYYY</Text> {/*pulled sample date: "Sep 19, 2022"*/}
                        </VStack>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Latest update</Text>
                            <Text fontWeight='500' fontSize='14px'>Mmm DD, YYYY</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack>
                    <HStack>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Deployment</Text>
                            <Link
                                href={previewLink}
                                target="_blank">
                                <Text fontWeight='500' fontSize='14px' color='rgba(129, 162, 255, 1)'>
                                    {previewLink.split('?')[0]} <ExternalLinkIcon w='20px' h='20px' />
                                </Text>
                            </Link>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack>
                    <HStack>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Domain</Text>
                            {/* <Link href='' isExternal> */}
                            <Text fontWeight='500' fontSize='14px' color='rgba(129, 162, 255, 1)'>
                                embeddable-nft-marketplace.app <ExternalLinkIcon w='20px' h='20px' />
                            </Text>
                            {/* </Link> */}
                        </VStack>
                    </HStack>
                </VStack>
                <Divider flex={1} />
                <HStack >
                    <Button variant="theme-low" href={SITE_LINKS.embeddablesUpdate(data?.$type ?? '', data?.key ?? '')} as={Link}>Edit</Button>
                    <Button variant="theme-filled" rightIcon={<ExternalLinkIcon w='13.5px' h='13.5px' />}>Documentation</Button>
                </HStack>
            </VStack>
        </Flex>
    )
}

export default ViewInfo