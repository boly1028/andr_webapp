import { useQueryAllChainConfigs } from "@/lib/graphql/hooks/chain/useChainConfig";
import { Box, Flex, HStack, Image, Text, Tooltip } from "@chakra-ui/react";
import React, { memo } from "react";
import { truncate } from "..";


interface CoinProps {
  amount: number | string;
  denom: string;
}

/**
 * Provides the image for a coin and an amount
 * NOT FUNCTIONING
 * TODO: REPAIR
 */
const Coin: React.FC<CoinProps> = memo(function Coin({ amount, denom }) {
  const { data: chains } = useQueryAllChainConfigs();
  const chain = chains?.find(c => c.defaultFee.endsWith(denom))
  const imgUrl = chain?.iconUrls?.sm || chain?.iconUrls?.lg;
  return (
    <Flex direction='row' gap='4' p="2" border="1px" borderColor="border.main" bg='background.700' rounded="lg">
      <Image width="6" height="6" src={imgUrl || '/icons/placeholder-coin.png'} />
      <Text fontWeight='bold'>{amount}</Text>
      <Tooltip label={denom} openDelay={500}>
        <Text ml='auto' textStyle='light' color='dark.500'>{truncate(denom)}</Text>
      </Tooltip>
    </Flex>
  );
});

export default Coin;
