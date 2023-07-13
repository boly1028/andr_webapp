import { Box, VStack, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react'
import { ChevronUpIcon } from '@chakra-ui/icons';

const ScrollToTop: FC = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            {isVisible &&
                <VStack
                    onClick={handleClick}
                    position={'fixed'}
                    bottom='14%'
                    right='6%'
                    cursor={'pointer'}
                    spacing={7}
                >
                    <Box
                        w='28px'
                        h='28px'
                        backgroundColor={'rgba(68, 129, 255, 1)'}
                        borderRadius='24px'
                        pl='4px'
                        position={'absolute'}
                    >
                        <ChevronUpIcon boxSize={5} position={'relative'} bottom='2.5px' right='2.5px' />
                    </Box>
                    <Text fontSize={'12px'} fontWeight='500' position={'fixed'}>Back To Top</Text>
                </VStack>
            }
        </>
    )
}

export default ScrollToTop