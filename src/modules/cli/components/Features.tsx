import { SparklesIcon } from '@/modules/common'
import { Box, Flex, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import { FolderSearch, Package, PackageSearch, Wallet } from 'lucide-react'
import React, { FC } from 'react'

interface FeaturesProps {

}
const Features: FC<FeaturesProps> = (props) => {
    const { } = props

    return (
        <Box>
            <Text fontSize='2xl' fontWeight='semibold' color='white' >Features</Text>
            <Text mt='4'>
                The main features offered by the Andromeda CLI are the following:
            </Text>
            <Flex direction='row' gap='4' flexWrap='wrap' mt='4'>
                {FEATURES_LIST.map(feature => (
                    <FeatureItem key={feature.text} feature={feature} />
                ))}
            </Flex>
        </Box>
    )
}


interface FeatureItemProps {
    feature: typeof FEATURES_LIST[number];
}
const FeatureItem: FC<FeatureItemProps> = (props) => {
    const { feature } = props

    return (
        <Box as={VStack} flex='1' bg='dark.50' px='4' py='8' rounded='2xl' width='40' gap='4'>
            <Icon as={feature.icon} boxSize='12' rounded='xl' p='3' bg='rgba(68, 129, 255, 0.12)' />
            <Text fontSize='md' fontWeight='semibold' textAlign='center'>{feature.text}</Text>
        </Box>
    )
}

const FEATURES_LIST = [
    {
        icon: Wallet,
        text: "Generating keys and managing wallets"
    },
    {
        icon: SparklesIcon,
        text: "Swapping between chains"
    },
    {
        icon: Package,
        text: "Deploying ADOs on chain"
    },
    {
        icon: PackageSearch,
        text: "Query your ADOs"
    },
    {
        icon: FolderSearch,
        text: "Check ADOs"
    },
]
export default Features