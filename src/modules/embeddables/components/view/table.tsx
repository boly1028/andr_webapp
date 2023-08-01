import { IAdoType } from '@/lib/schema/types'
import { INCLUDE_ADO } from '@/lib/schema/utils/list'
import AdoItem from '@/modules/assets/components/AdosList/AdoItem'
import styles from './view.module.css'
import ClassifierIcon from '@/theme/icons/classifiers'
import { ChevronRightIcon, CloseIcon } from '@chakra-ui/icons'
import { ChevronDownIcon } from '@/modules/common';
import { Flex, Button, MenuList, MenuItem, Box, Menu, Link as ChakraLink } from '@chakra-ui/react'
import React, { FC } from 'react'
import InlineStat from '../InlineStat'
import NextLink from "next/link";
import { useDisclosure } from "@chakra-ui/hooks";
import { SITE_LINKS } from '@/modules/common/utils/sitelinks'
import { IEmbeddableCollection } from '@/lib/schema/types/embeddables'
import { useWallet } from '@/lib/wallet'
import { useGetEmbeddableApp } from '../../hooks/useGetEmbeddableApp'


interface TableProps {
    item: IEmbeddableCollection;
    eKey: string;
}
const Table: FC<TableProps> = ({ item, eKey }) => {
    const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
    const buttonProps = getButtonProps();
    const disclosureProps = getDisclosureProps();
    const { embeddable } = useGetEmbeddableApp();

    const previewLink = SITE_LINKS.embeddablePreviewCollection(item.id, `${embeddable?.address}--${eKey}`);

    return (
        <Flex
            border="1px solid"
            borderColor="dark.300"
            p={5}
            borderRadius="lg"
            mb={4}
            _last={{ mb: 0 }}
            direction="column"
        >
            <Flex
                align="start"
                gap="2"
                className={styles.container}
                p='12px'
            >
                <Box w={8} h={8} borderRadius="lg" mr={6} alignSelf="center">
                    <ClassifierIcon adoType={'app'} boxSize={5} />
                </Box>

                <Box flex={1.5}>
                    <InlineStat label="Name" value={item.name} />
                </Box>
                <Box flex={1}>
                    <InlineStat label="Type" value={item.type} />
                </Box>
                <Flex alignItems="center" gap="1" alignSelf="center" w='28' justifyContent='end'>
                    <ChakraLink href={previewLink} isExternal>
                        <Button
                            onClick={() => ''}
                            colorScheme="primary"
                            rightIcon={<ChevronRightIcon boxSize={4} />}
                            fontSize='14px'
                            w='90px'
                            size='xs'
                            className={styles.onHover}
                        >
                            View
                        </Button>
                    </ChakraLink>
                    <Box>
                        <Button {...buttonProps} variant="unstyled" size="sm">
                            {isOpen ? (
                                <CloseIcon boxSize="2" />
                            ) : (
                                <ChevronDownIcon boxSize="4" />
                            )}
                        </Button>
                    </Box>
                </Flex>
            </Flex>
            {isOpen && (
                <>
                    {Object.keys(item).filter(ado => INCLUDE_ADO.includes(ado)).map((adoName) => {
                        return (
                            <Flex
                                {...disclosureProps}
                                mt="4"
                                rounded="xl"
                                direction="row"
                                key={adoName}
                            >
                                <AdoItem
                                    key={item[adoName]}
                                    address={item[adoName]}
                                    adoType={adoName as IAdoType}
                                    proxyAddress={''}
                                    name={adoName}
                                />
                            </Flex>
                        )
                    })}
                </>
            )}
        </Flex>
    )
}

export default Table