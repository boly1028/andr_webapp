import { useQueryTxByAddress } from "@/lib/graphql";
import { useQueryChainConfig } from "@/lib/graphql/hooks/chain/useChainConfig";
import { CopyButton, FallbackPlaceholder, truncate } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { useAndromedaStore } from "@/zustand/andromeda";
import { Box, Center, Flex, Icon, IconButton, Skeleton, Text, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "lucide-react";
import React, { FC } from "react"

interface Props {
    address: string
}

const Transactions: FC<Props> = (props) => {
    const { address } = props;
    const chainId = useAndromedaStore(state => state.chainId);
    const { data: currentConfig } = useQueryChainConfig(chainId);
    const { data: txs, loading } = useQueryTxByAddress(address, chainId);

    return (
        <Box
            p="2"
            rounded="xl"
            border="1px"
            borderColor="border.main"
            maxH='96'
            overflow='auto'
        >
            <VStack gap='4' alignItems='start' textStyle="main-sm-regular">
                {loading && (
                    <Skeleton h='14' rounded="xl" />
                )}
                {txs?.length === 0 && (
                    <Center alignSelf="center">
                        <FallbackPlaceholder title="No Transaction found" desc="This contract does not have any transactions yet" />
                    </Center>
                )}
                {txs?.map(tx => (
                    <Flex key={tx.hash} flexDirection='row' gap={2} w='full'>
                        <CopyButton
                            variant="link"
                            colorScheme="gray"
                            gap="2"
                            text={tx.hash}
                        >
                            {truncate(tx.hash, [12, 10])}
                        </CopyButton>
                        <IconButton
                            aria-label="contract-address-explorer"
                            as="a"
                            href={currentConfig ? SITE_LINKS.blockExplorerTx(currentConfig, address) : ''}
                            target="_blank"
                            icon={<Icon as={ExternalLinkIcon} />}
                            variant="theme-ghost"
                            size='sm'
                        />
                        <Text textStyle="main-sm-regular" color="content.medium" ml='auto'>Block Height: {tx.height}</Text>
                    </Flex>
                ))}
            </VStack>
        </Box>
    )
}

export default Transactions