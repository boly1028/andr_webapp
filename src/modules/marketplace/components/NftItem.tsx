import React, { FC } from "react";
import Link from "next/link";
import { Box, Image } from "@chakra-ui/react";

import { CardFooter } from "@/modules/common";

interface NftItemProps {
  data: {
    image: string;
    collection: string;
    name: string;
    desc: string;
    value: string;
  };
}

const NftItem: FC<NftItemProps> = ({ data }) => {
  const { image, name, desc, value, collection } = data;

  return (
    <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="lg">
      <Link href={`/collections/generic/4037`} passHref>

        <Image src={image} alt="Image" borderRadius="lg" mb={6} />

      </Link>
      <CardFooter
        data={{ title: name, subtitle: desc, value, image: collection }}
      />
    </Box>
  );
};

export default NftItem;
