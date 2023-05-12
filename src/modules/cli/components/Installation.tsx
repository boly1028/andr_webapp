import { useGetLatestNPMVersion } from '@/lib/andrjs'
import { CopyButton } from '@/modules/common'
import { CopyIcon } from '@chakra-ui/icons'
import { Alert, AlertDescription, AlertIcon, Box, Code, Heading, HStack, Image, Link, Text, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'

interface InstallationProps {

}
const Installation: FC<InstallationProps> = (props) => {
    const { } = props
    const { data: version } = useGetLatestNPMVersion()
    return (
        <Box>
            <Text fontSize='2xl' fontWeight='semibold' color='white' >Installation</Text>
            <VStack alignItems='stretch' gap='4'>
                <Text mt='4'>
                    The CLI can be downloaded using our <Link href="https://www.npmjs.com/package/@andromedaprotocol/cli" target='_blank' color='blue.500'>npm package</Link> or by running the following command in your terminal:
                </Text>
                <Box>
                    <Code rounded='xl' bg='dark.50' px='8' py='6' lang='bash'>
                        <HStack spacing={2} alignItems='center'>
                            <Text>npm </Text>
                            <Text color='green.300'>install </Text>
                            <Text>-g </Text>
                            <Text color='blue.300'>@andromedaprotocol/cli@latest </Text>
                            <CopyButton variant='unstyled' cursor='pointer' fontSize='xs' text="npm install -g @andromedaprotocol/cli@latest">
                                <CopyIcon boxSize='4' />
                            </CopyButton>
                        </HStack>
                    </Code>
                    <Alert status='warning' bg='none' fontSize='sm'>
                        <AlertIcon />
                        <AlertDescription>The latest version currently is {version || '>=0.1.7'}, but make sure you check for the latest version at the time of installation.</AlertDescription>
                    </Alert>
                </Box>
                <Text mt='4'>
                    Once the package has been installed, you can run <Text as='span' color='blue.500'>“andr”</Text> in the terminal to open the CLI:
                </Text>
                <Box maxW='sm' mt='4'>
                    <Image src='/cli/cli2.png' />
                </Box>
                <Text mt='4'>
                    {/* If interested in working with our CLI, make sure to check out our full <Link href="https://docs.andromedaprotocol.io/andromeda/andromeda-cli/introduction" target='_blank' color='blue.500'>CLI documentation</Link> where we go over every command available. */}
                    If interested in working with our CLI or having issues with installation, please make sure to check out our full <Link href="https://docs.andromedaprotocol.io/andromeda/andromeda-cli/introduction" target='_blank' color='blue.500'>CLI documentation</Link> where we go over every command available.
                </Text>
            </VStack>
        </Box>
    )
}
export default Installation