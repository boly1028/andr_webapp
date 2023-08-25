import { Box, Heading, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import Placeholders from './Placeholders';

const Embeddables = () => {
  return (
    <Box pb='30px'>
      <Box pb='48px'>
        <Heading textAlign={'center'} fontWeight='bold' fontSize={'2xl'}>Integrate ADOs into your project</Heading>
      </Box>
      <VStack alignItems={'left'} pb='24px'>
        <Heading fontWeight={'medium'} size='sm'>Examples</Heading>
        <Text fontSize={'xs'} color='#aaa4a4;'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit deserunt quos eveniet?</Text>
      </VStack>
      <Placeholders />
    </Box>
  )
}

export default Embeddables