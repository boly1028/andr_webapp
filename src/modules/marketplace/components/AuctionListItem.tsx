import React, { FC } from "react";
import Link from "next/link";
import { Flex, Box, Image, Text } from "@chakra-ui/react";

import { CardFooter } from "@/modules/common";

interface Props {
  data: {
    image: string;
    collection: string;
    name: string;
    desc: string;
    endsAt: string;
    value: string;
  };
}

const AuctionListItem: FC<Props> = ({ data }) => {
  const { image, name, desc, value, collection, endsAt } = data;

  return (
    <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="lg">
      <Link href={`/assets/${name}`} passHref>
        <a>
          <Image src={image} alt="Image" borderRadius="lg" mb={6} />
        </a>
      </Link>

      <Flex
        border="2px solid #9E77ED"
        justify="space-between"
        borderRadius="xl"
        p={2}
        fontSize="sm"
        mb={4}
      >
        <Text color="gray.500">Ends in 🔥</Text>
        <Text color="primary.600" fontWeight={600}>
          {endsAt}
        </Text>
      </Flex>
      <CardFooter
        data={{ title: name, subtitle: desc, value, image: collection }}
      />
    </Box>
  );
};

export default AuctionListItem;
