import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React, { memo } from "react";

const images: Record<string, string> = {
  ujunox: "https://assets.coingecko.com/coins/images/19249/small/juno.png",
};

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
  const imgUrl = images[denom] ?? images.ujunox;
  return (
    <Flex direction='row' gap='4' p="2" border="1px" borderColor="gray.300" rounded="lg">
      <Image width="6" height="6" src={imgUrl} alt={`Coin - ${denom}`} />
      <Text fontWeight='bold'>{amount}</Text>
      <Text ml='auto' textStyle='light'>{denom}</Text>
    </Flex>
  );
});

export default Coin;
