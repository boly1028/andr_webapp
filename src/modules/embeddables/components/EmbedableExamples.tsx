import { Heading, Box, Text, VStack, HStack, Image } from '@chakra-ui/react'
// import { CodeBrowser } from '@/modules/common';

const exapmplesObj = [
    { type: 'Auction' , img: 'embeddable/embAuctionIcon.png'},
    { type: 'Market' , img: 'embeddable/embAuctionIcon.png'},
    { type: 'Crowdfund' , img: 'embeddable/embAuctionIcon.png'},
    { type: 'Token exchange' , img: 'embeddable/embAuctionIcon.png'}
]
const EmbedableExamples = () => {
    return (
        <Box>
            <VStack spacing={'10px'} alignItems='flex-start'>
                <Heading fontSize={'20px'} fontWeight='500'>Examples</Heading>
                <Text fontWeight={400} fontSize='14px' color='rgba(255, 255, 255, 0.6)'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, quod.</Text>
            </VStack>
            <HStack mt='20px'>
                {exapmplesObj &&
                    exapmplesObj.map((item, index) => {
                        return (
                            <VStack
                                key={index}
                                w='25%'
                                bgColor={'rgba(255, 255, 255, 0.05)'}
                                alignItems='center'
                                justifyContent={'center'}
                                borderRadius='8px'
                                py={'14px'}
                                gap='0'
                                >
                                {/* <Icon as={CodeBrowser} boxSize='6' /> */}
                                <Image alt='' src={item.img} w='48px' h='48px'/>
                                <Text mt='2px !important' fontSize={'14px'}>{item.type}</Text>
                            </VStack>
                        )
                    })}
            </HStack>
        </Box>
    )
}

export default EmbedableExamples