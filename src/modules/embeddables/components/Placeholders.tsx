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
                                <a href={item.demoLink} target='_blank' rel="noopener noreferrer">
                                    <Button
                                        rightIcon={<ExternalLinkIcon boxSize={3}/>}
                                        colorScheme='primary'
                                        size='xs'
                                        borderRadius={'6px'}
                                        className={styles.demoButton}
                                    >View Demo</Button>
                                </a>
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
    { type: 'Auction', icon: Auction, demoLink: 'https://embeddable-marketplace-demo.vercel.app/embeddables-auction-1/cw721/ANDR6?config=andr10xuc5g4xd5ja5q608qh8g9r9ftg46lnc0cxze8ds823nxgkwuu7swy54zl--Demo-Auction', img: 'placeholders/AuctionDark.png' },
    { type: 'Market', icon: Market, demoLink: 'https://embeddable-marketplace-demo.vercel.app/?config=stars1vgjkrx9zhjem3gfzm99jcz5wpradya5kz0lwhztdgvqgdgcrkswqhkvh25--Marketplace-Demo', img: 'placeholders/MarketDrak.png' },
    { type: 'CrowdFund', icon: CrowdFund, demoLink: 'https://embeddable-marketplace-demo.vercel.app/embeddables-crowdfund-1/cw721/CNFT-1?config=terra177hm07macqvm4rttkerncrdjp5aga2za9tn6444lllametaadnkswg6k4m--Crowdfund%20Demo', img: 'placeholders/CrowdfundDark.png' },
    { type: 'TokenExchange', icon: TokenExchange, demoLink: 'https://embeddable-marketplace-demo.vercel.app/', img: 'placeholders/TokenExchangeDark.png' }
];
