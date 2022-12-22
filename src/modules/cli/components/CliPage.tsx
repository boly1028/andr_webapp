import { Box, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import Banner from './Banner'
import Features from './Features'
import Installation from './Installation'
import Introduction from './Introduction'

interface CliPageProps {
}

const CliPage: FC<CliPageProps> = (props) => {
    const { } = props

    return (
        <Box pb='10' color='rgba(255, 255, 255, 0.87)' fontWeight='light'>
            <VStack alignItems='stretch' spacing='12'>
                <Banner />
                <Introduction />
                <Features />
                <Installation />
            </VStack>
        </Box>
    )
}
export default CliPage