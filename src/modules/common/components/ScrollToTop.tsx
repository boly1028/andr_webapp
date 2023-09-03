import { VStack, Flex } from '@chakra-ui/react';
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
    if (!isVisible) return null;

    return (
        <VStack
            onClick={handleClick}
            position="fixed"
            bottom='6%'
            translateX='-12'
            transform='auto'
            cursor={'pointer'}
            spacing={7}
            title='Back to top'
        >
            <Flex
                w='28px'
                h='28px'
                backgroundColor={'rgba(68, 129, 255, 1)'}
                borderRadius='24px'
                justifyContent={'center'}
                alignItems='center'
            >
                <ChevronUpIcon boxSize={5} />
            </Flex>
        </VStack>
    )
}

export default ScrollToTop