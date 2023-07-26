import { Box, Heading, VStack, Text } from '@chakra-ui/react'
import React from 'react'

const Embeddables = () => {
  return (
    <Box>
      <Box pb='60px'>
        <Heading textAlign={'center'} fontWeight='bold' fontSize={'2xl'}>Integrate ADOs into your project</Heading>
      </Box>
      <VStack alignItems={'left'}>
        <Heading fontWeight={'medium'} size='sm'>Examples</Heading>
        <Text fontSize={'xs'} color='#aaa4a4;'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit deserunt quos eveniet?</Text>
      </VStack>
    </Box>
  )
}

export default Embeddables