import React, { FC } from "react";
import { Box, Image, Text, Flex } from "@chakra-ui/react";

interface FeaturedItemProps {
  data: {
    image: string;
    name: string;
    collection: string;
  };
  isMain?: boolean;
}

const FeaturedItem: FC<FeaturedItemProps> = ({ data, isMain = false }) => {
  const { image, name, collection } = data;

  return (
    <Box
      w={isMain ? "488px" : "full"}
      h={isMain ? "512px" : "full"}
      position="relative"
    >
      <Image
        h="full"
        w="full"
        objectFit="cover"
        src={image}
        borderRadius="lg"
        alt="Image"
      />
      <Flex
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        justify="space-between"
        align="center"
        p={isMain ? 5 : 3}
      >
        <Text fontWeight={700} color="white" fontSize={isMain ? "2xl" : "md"}>
          {name}
        </Text>
        <Image src={collection} boxSize={8} borderRadius="full" />
      </Flex>
    </Box>
  );
};

export default FeaturedItem;
