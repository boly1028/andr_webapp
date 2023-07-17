import {
    Heading,
    Text,
    Flex,
    Button,
    HStack
} from '@chakra-ui/react'
import React from 'react'
import { AddIcon } from '@chakra-ui/icons';
import { SITE_LINKS } from '@/modules/common/utils/sitelinks';
import Link from "next/link";

const EmbeddableHeader = () => {
    return (
        <Flex
            direction={'column'}
            alignItems={'center'}
            gap='12px'
            mb='30px'
        >
            <Heading fontWeight={600} fontSize='28px'>Integrate apps into your projects</Heading>
            <Text fontWeight={400} fontSize='14px' textAlign={'center'} w='40%' color='rgba(255, 255, 255, 0.6)'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, Natus nisi distinctio facere?</Text>
            <HStack>
                <Link href={SITE_LINKS.embeddablesBuild('nft')}>
                    <Button leftIcon={<AddIcon />} colorScheme={'primary'} size='sm'>
                        New Embedabble
                    </Button>
                </Link>
                <Button bgColor={'rgba(255, 255, 255, 0.05)'} size='xs'>Learn More</Button>
            </HStack>
        </Flex>
    )
}

export default EmbeddableHeader