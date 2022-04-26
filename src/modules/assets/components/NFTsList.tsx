import React, { FC } from "react";
import {
  Flex,
  Box,
  Image,
  SimpleGrid,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { TerraIcon } from "@/modules/common";

interface NFTAsset {
  id: number;
  image: string;
  name: string;
  type: string;
  chain: string;
}

const ITEMS: Array<NFTAsset> = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=w600",
    name: "mfer boy #4037",
    type: "Digital art",
    chain: "TERRA",
  },
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/lfLT98fGLJ_vgblkfwE6sttMVSqVTdf8oWIKEbTi7Y_TejgNUKoNDps07fjRMHdyX3Fy1azhUZ5zJG_As98UGq7BwSAs8GeME1T_9w=w600",
    name: "Doggy #7848",
    type: "Digital art",
    chain: "TERRA",
  },
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/hQyNnIvqqeDmInYI_c_R4tZFNldI2sPyng_GixaMb9KdAUlGsLAcnJfNaMEOj4XmTsNq_oVCOLjdWKcg0ZkRP20aQY-tsWP00zTE_lM=w600",
    name: "EA #2706",
    type: "Digital art",
    chain: "TERRA",
  },
];

interface NFTsListItemProps {
  data: NFTAsset;
}

const NFTsListItem: FC<NFTsListItemProps> = ({ data }) => {
  const { image, name, type } = data;

  return (
    <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="lg">
      <Image src={image} alt="Image" borderRadius="lg" mb={6} />
      <Flex justify="space-between" mb={3}>
        <Box>
          <Text fontSize="sm" fontWeight={700} color="gray.700">
            {name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {type}
          </Text>
        </Box>
        <Box>
          <TerraIcon
            boxSize={8}
            p={1}
            borderRadius="full"
            border="1px solid"
            borderColor="gray.300"
          />
        </Box>
      </Flex>
      <Flex justify="space-between">
        <Text fontWeight={700} color="primary.600" fontSize="sm">
          Details
        </Text>
        <Text>...</Text>
        <Menu>
          <MenuButton as={Button}>...</MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

const NFTsList: FC = () => {
  return (
    <SimpleGrid columns={3} spacing={4}>
      {ITEMS.map((item) => {
        return <NFTsListItem key={item.id} data={item} />;
      })}
    </SimpleGrid>
  );
};

export default NFTsList;
