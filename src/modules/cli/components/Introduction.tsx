import { Box, Heading, Text } from '@chakra-ui/react'
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
                <br /><br />To solve this problem, we have built the Andromeda CLI. The CLI is an all encompassing tool to allow users quick and easy interaction with any of the chains that Andromeda is deployed on. You can check the homepage of our website to see what chains Andromeda is deployed on or looking to deploy on.
            </Text>
        </Box>
    )
}
export default Introduction