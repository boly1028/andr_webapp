import { Box, BoxProps, Center, Image, chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { Logo } from '.';

const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});


interface Props extends BoxProps {
    isLoading: boolean;
    delay?: number;
}

const AnimatedLogo: FC<Props> = (props) => {
    const { isLoading, delay = 0, children, ...boxProps } = props;
    const [delayedLoading, setDelayedLoading] = useState(false);
    useEffect(() => {
        if (isLoading) {
            const tId = setTimeout(() => {
                setDelayedLoading(true)
            }, delay);
            return () => clearTimeout(tId);
        } else {
            setDelayedLoading(false)
        }
    }, [isLoading])
    if (!delayedLoading) return <>{children}</>
    return (
        <Center h='full' w='full'>
            <ChakraBox
                animate={{
                    scale: [1, 1.5, 1.5, 1, 1],
                    rotate: [0, 0, 360, 360, 0],
                    opacity: [0.5, 0.5, 0.8, 0.8, 0.5, 0.5]
                }}
                // @ts-ignore no problem in operation, although type error appears.
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                padding="2"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100px"
                height="100px"
                {...boxProps}
            >
                <Image src="/logo.png" />
            </ChakraBox>
        </Center>
    )
}

export default AnimatedLogo