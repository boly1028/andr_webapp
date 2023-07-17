import { Box, Button, VStack } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"
import { useGetEmbeddableKeys } from "../hooks/useGetEmbeddables";
import EmbeddableItem from "./EmbeddableItem";
import Link from "next/link";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";

interface Props {
    address: string;
}

const EmbeddableList: FC<Props> = (props) => {
    const { address } = props;
    const { keys } = useGetEmbeddableKeys(address);
    return (
        <Box py='6'>
            <VStack spacing={4} w='full'>
                {keys.map(eKey => (
                    <EmbeddableItem
                        key={eKey}
                        address={address}
                        eKey={eKey}
                    />
                ))}
                {/* <Link href={SITE_LINKS.embeddablesBuild('nft')}>
                    <Button
                        colorScheme="primary"
                        w='full'
                    >
                        Create New NFT Embeddable
                    </Button>
                </Link> */}
            </VStack>
        </Box>
    )
}

export default EmbeddableList