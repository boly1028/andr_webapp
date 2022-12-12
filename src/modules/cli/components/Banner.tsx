import { Box, Button, GridItem, Icon, Image, Link, SimpleGrid, Text } from '@chakra-ui/react'
import { FileText } from 'lucide-react'
import React, { FC } from 'react'

interface BannerProps {

}
const Banner: FC<BannerProps> = (props) => {
    const { } = props

    return (
        <Box background="linear-gradient(90deg, rgba(73,13,152,1) 0%, rgba(2,2,0,1) 50%, rgba(2,96,44,1) 100%)" rounded='2xl'>
            <SimpleGrid columns={2}>
                <GridItem>
                    <Box p='10'>
                        <Text fontSize='4xl' fontWeight='semibold' >Andromeda CLI</Text>
                        <Text mt='2' fontSize='md'>
                            Lorem ipsum dolor sit amet consectetur. Facilisis semper tincidunt pellentesque viverra rhoncus netus.
                        </Text>
                        <Button as='a' href="https://docs.andromedaprotocol.io/andromeda/andromeda-cli/introduction" target='_blank' mt='3' leftIcon={<Icon as={FileText} />} colorScheme="primary" size='sm'>Documentation</Button>
                    </Box>
                </GridItem>
                <GridItem alignSelf='end'>
                    <Box overflow="hidden" roundedBottomEnd='2xl'>
                        <Image src='/cli/cli.png' w='full' mt='auto' />
                    </Box>
                </GridItem>
            </SimpleGrid>
        </Box>
    )
}
export default Banner