import { Box, Heading, Link, Text } from '@chakra-ui/react'
import React, { FC } from 'react'

interface IntroductionProps {

}
const Introduction: FC<IntroductionProps> = (props) => {
    const { } = props

    return (
        <Box>
            <Text fontSize='2xl' fontWeight='semibold' color='white' >Introduction</Text>
            <Text mt='4'>
                Andromeda aims to be a unifier of the Cosmos, meaning the Andromeda ecosystem will be available on most, if not all, Cosmos chains. We are looking to eliminate the burden and inconvenience for developers that want to develop using the Andromeda ecosystem to have to learn every deployment method of each chain in order to interact with our ADOs.
                <br /><br />To solve this problem, we have built the Andromeda CLI. The CLI is an all encompassing tool to allow users quick and easy interaction with any of the chains that Andromeda is deployed on. You can check out what chains Andromeda is deployed on by going <Link href="https://docs.andromedaprotocol.io/andromeda/andromeda-cli/introduction#deployed-chains" target='_blank' color='blue.500'>here</Link>.
            </Text>
        </Box>
    )
}
export default Introduction