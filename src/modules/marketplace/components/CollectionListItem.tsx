import React, { FC } from "react";
import Link from "next/link";
import { Box, Image, Text, HStack } from "@chakra-ui/react";

interface Props {
  data: {
    id: number;
    image: string;
    slug: string;
    chain: string;
    name: string;
    marketcap: string;
  };
}

const CollectionListItem: FC<Props> = ({ data }) => {
  const { id, image, name, slug, marketcap } = data;

  return (
    <Box>
      <HStack spacing={3}>
        <Text textStyle="light" fontWeight={500} minW={4} textAlign="center">
          {id}
        </Text>
        <Link href={`/collections/${slug}`} passHref>

          <Image src={image} alt="Image" boxSize={16} borderRadius="full" />

        </Link>
        <Box>
          <Text textStyle="bold">{name}</Text>
          <Text textStyle="light">{marketcap}</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default CollectionListItem;
