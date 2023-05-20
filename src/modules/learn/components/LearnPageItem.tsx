import { Box, Center, Flex, GridItem, HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC } from 'react'
import { ILearnPageItem, ILearnPageSubItem } from '../types'

interface LearnPageItemProps {
    item: ILearnPageItem;
    number: number;
}
const LearnPageItem: FC<LearnPageItemProps> = (props) => {
    const { item, number } = props

    return (
        <Box>
            <HStack gap={4}>
                <Center w='16' h='16' bg='dark.100' rounded='xl'>
                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize='4xl'
                        fontWeight='extrabold'
                    >
                        {number}
                    </Text>
                </Center>
                <Box>
                    <Text fontSize='xl' fontWeight='medium'>{item.title}</Text>
                    <Text mt='2' fontSize='sm' color='dark.500'>{item.description}</Text>
                </Box>
            </HStack>
            <SimpleGrid columns={3} gap='6' mt='10'>
                {item.items.map(subItem => (
                    <GridItem key={subItem.title}>
                        <LearnPageSubItem subItem={subItem} />
                    </GridItem>
                ))}
            </SimpleGrid>
        </Box>
    )
}


interface LearnPageSubItemProps {
    subItem: ILearnPageSubItem
}
const LearnPageSubItem: FC<LearnPageSubItemProps> = (props) => {
    const { subItem } = props

    return (
        <Box>
            {subItem.title !== '5: Auctioning App in CLI' ?
                <Link href={subItem.link || '#'} passHref>
                    <Center as='a' bg='dark.100' rounded='xl' h='40' cursor='pointer'>
                        <Icon as={subItem.icon} boxSize='16' />
                    </Center>
                </Link> :
                <a href={subItem.link} target="_blank" rel="noopener noreferrer">
                    <Center as='a' bg='dark.100' rounded='xl' h='40' cursor='pointer'>
                        <Icon as={subItem.icon} boxSize='16' />
                    </Center>
                </a>
            }
            <Box mt='4' ml='1'>
                <Text fontSize='lg' fontWeight='medium'>{subItem.title}</Text>
                <Text mt='2' fontSize='sm' color='dark.500'>{subItem.description}</Text>
            </Box>
        </Box>
    )
}


export default LearnPageItem