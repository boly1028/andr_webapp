import { Box, Button, Flex, GridItem, Heading, Icon, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { ArrowRight, List } from 'lucide-react'
import React, { FC } from 'react'
import { LEARN_PAGE_ITEMS } from '../utils'
import LearnPageItem from './LearnPageItem'

interface LearnPageProps {

}
const LearnPage: FC<LearnPageProps> = (props) => {
    const { } = props

    return (
        <Box pb='10'>
            <SimpleGrid columns={2} alignItems='center' spacing='6'>
                <GridItem>
                    <Box maxW='90%'>
                        <Text fontSize='4xl' fontWeight='semibold'>Learn Andromeda</Text>
                        <Text fontSize='sm' color='dark.500'>A collection of video tutorials, examples, and articles to get you up and running as quickly as possible.</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box py='6' pl='6'>
                        <Image src='/learn/header.png' />
                    </Box>
                </GridItem>
            </SimpleGrid>

            <VStack alignItems='stretch' gap='16' my='6'>
                {LEARN_PAGE_ITEMS.map((item, idx) => (
                    <LearnPageItem key={idx} number={idx + 1} item={item} />
                ))}
            </VStack>

            <Flex direction='row' gap='8' p='6' bg='dark.100' rounded='xl' mt='16'>
                <Box>
                    <Image w='16' src='/icons/book-icon-gradient.png' />
                </Box>
                <Box maxW='60%'>
                    <Text lineHeight='1.3em' fontSize='4xl' fontWeight='semibold'>Dive deeper with technical documentation</Text>
                    <Text mt='2' fontSize='sm' color='dark.500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.</Text>
                </Box>
                <Button
                    rightIcon={<Icon as={ArrowRight} />}
                    colorScheme='primary'
                    ml='auto'
                >
                    Get Started
                </Button>
            </Flex>
        </Box>
    )
}
export default LearnPage