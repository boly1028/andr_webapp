import { EmbPublishIcon, truncate } from '@/modules/common';
import { Box, Flex, HStack, Image, VStack, Text, Icon, Tag, TagLabel, Link, Divider, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { CopyFilledIcon } from '@/modules/common';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import styles from './view.module.css';

const ViewInfo: FC = () => {
    const address = truncate('andr123xxyey4enkfcfgv5212cxl003xmk78tdpmy6k5m5zhr');
    return (
        <Flex gap='24px' w='full'>
            <Box w='50%' className={styles.imgContainer} position='relative'>
                <Image alt='' src={'../../embeddable/embPreviewPlaceHolder.png'} h='full' />
                <Box className={styles.imgButton}>
                    <Button size={'sm'} colorScheme='primary' rounded={'8px'}>Preview Project</Button>
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
                                <Text fontWeight='500' fontSize='14px'>{address}
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
                            <Text fontWeight='500' fontSize='14px'>App</Text>
                        </VStack>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Published</Text>
                            <Text fontWeight='500' fontSize='14px'>Sep 19, 2022</Text>
                        </VStack>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Latest update</Text>
                            <Text fontWeight='500' fontSize='14px'>Sep 30, 2022</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack>
                    <HStack>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Deployment</Text>
                            <Link href='https://chakra-ui.com' isExternal>
                                <Text fontWeight='500' fontSize='14px' color='rgba(129, 162, 255, 1)'>
                                    embeddable-nft-marketplace-demo-andromeda.app <ExternalLinkIcon w='20px' h='20px' />
                                </Text>
                            </Link>
                        </VStack>
                    </HStack>
                </VStack>
                <VStack>
                    <HStack>
                        <VStack alignItems={'flex-start'}>
                            <Text color="rgba(255, 255, 255, 0.6)" fontWeight='500' fontSize='14px'>Domain</Text>
                            <Link href='https://chakra-ui.com' isExternal>
                                <Text fontWeight='500' fontSize='14px' color='rgba(129, 162, 255, 1)'>
                                    embeddable-nft-marketplace.app <ExternalLinkIcon w='20px' h='20px' />
                                </Text>
                            </Link>
                        </VStack>
                    </HStack>
                </VStack>
                <Divider />
                <HStack>
                    <Button bgColor={'rgba(255, 255, 255, 0.05)'} fontSize={'14px'} fontWeight='600' py='6px' px='16px' borderRadius={'6px'}>View template</Button>
                    <Button bgColor={'rgba(255, 255, 255, 0.05)'} fontSize={'14px'} fontWeight='600' py='6px' px='16px' borderRadius={'6px'} rightIcon={<ExternalLinkIcon w='13.5px' h='13.5px' />}>Documentation</Button>
                </HStack>
            </VStack>
        </Flex>
    )
}

export default ViewInfo