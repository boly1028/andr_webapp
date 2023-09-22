import {
    Heading,
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
            <Heading textStyle="main-2xl-bold">Integrate apps into your projects</Heading>
            <HStack>
                <Button as={Link} href={SITE_LINKS.embeddablesBuild('nft')}
                    leftIcon={<AddIcon />}
                    variant="theme-low"
                    size="sm"
                >
                    New Embedabble
                </Button>
                <Button
                    variant="theme-filled"
                    size="sm"
                >
                    Learn More
                </Button>
            </HStack>
        </Flex>
    );
}

export default EmbeddableHeader