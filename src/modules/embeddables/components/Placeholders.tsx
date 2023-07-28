import { ExternalLinkIcon } from '@chakra-ui/icons'
import { HStack, IconButton, VStack, Text, Button, Box, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import styles from './embedabble.module.css';
import { Auction, Market, CrowdFund, TokenExchange } from "@/modules/common";

const Placeholders = () => {
    const [selectedImage, setSelectedImage] = useState<string>('placeholders/AuctionDark.png');

    return (
        <Box>
            <HStack className={styles.container} pb='68px'>
                {
                    PlaceholdersData.map((item) => {
                        return (
                            <VStack
                                key={item.type}
                                w='250px'
                                h='150px'
                                bgColor={'rgba(255, 255, 255, 0.05)'}
                                alignItems='center'
                                justifyContent={'center'}
                                borderRadius='12px'
                                className={styles.demoContainer}
                                onClick={() => setSelectedImage(item.img)}
                            >
                                <IconButton
                                    // colorScheme='gray'
                                    bgColor={'rgba(255, 255, 255, 0.05)'}
                                    aria-label='Auction'
                                    icon={<item.icon />}
                                    borderRadius='12px'
                                    className={styles.iconButton}
                                />
                                <Text fontWeight={'500'} fontSize='16px'>{item.type}</Text>
                                <Button
                                    rightIcon={<ExternalLinkIcon />}
                                    colorScheme='primary'
                                    size='xs'
                                    borderRadius={'6px'}
                                    className={styles.demoButton}
                                >View Demo</Button>
                            </VStack>
                        )
                    })
                }
            </HStack>
            <Box w='full'>
                <Image alt='' src={selectedImage} w='full' objectFit={'cover'} />
            </Box>
        </Box>
    )
}

export default Placeholders

const PlaceholdersData = [
    { type: 'Auction', icon: Auction, link: '', img: 'placeholders/AuctionDark.png' },
    { type: 'Market', icon: Market, link: '', img: 'placeholders/MarketDrak.png' },
    { type: 'CrowdFund', icon: CrowdFund, link: '', img: 'placeholders/CrowdfundDark.png' },
    { type: 'TokenExchange', icon: TokenExchange, link: '', img: 'placeholders/TokenExchangeDark.png' }
];
