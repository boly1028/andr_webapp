import { Box } from "@chakra-ui/react";
import Image from "next/image";
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
  const imgUrl = images[denom];
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "50px auto" }}>
      <Image width="50px" height="50px" src={imgUrl} alt={`Coin - ${denom}`} />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {amount}
      </Box>
    </Box>
  );
});

export default Coin;
