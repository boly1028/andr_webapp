import { Box } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react'

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
                <Box
                    position={'fixed'}
                    bottom='2%'
                    right='7%'
                    cursor={'pointer'}
                    onClick={handleClick}
                >
                    Scroll To Top
                </Box>
            }
        </>
    )
}

export default ScrollToTop