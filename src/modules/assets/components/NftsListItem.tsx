import React, { FC } from "react";
import Link from "next/link";
import {
  Flex,
  Box,
  Image,
  Text,
  Link as _Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";

import { type NftAsset } from "@/modules/assets";

import {
  ArchiveIcon,
  CheckCircleIcon,
  FlameIcon,
  MoreHorizontalIcon,
  TerraIcon,
} from "@/modules/common";

interface NftsListItemProps {
  data: NftAsset;
}

const NftsListItem: FC<NftsListItemProps> = ({ data }) => {
  const { image, slug, name, type } = data;

  return (
    <Box border="1px solid" borderColor="gray.300" p={5} borderRadius="lg">
      <Link href={`/assets/${slug}`} passHref>
        <a>
          <Image src={image} alt="Image" borderRadius="lg" mb={6} />
        </a>
      </Link>
      <Flex justify="space-between" mb={3}>
        <Box>
          <Text fontSize="sm" fontWeight={700} color="gray.700" mb={1.5}>
            {name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {type}
          </Text>
        </Box>
        <Box>
          <Tooltip label="Terra chain">
            <Box>
              <TerraIcon
                boxSize={8}
                p={1}
                borderRadius="full"
                border="1px solid"
                borderColor="gray.300"
              />
            </Box>
          </Tooltip>
        </Box>
      </Flex>
      <Flex justify="space-between" align="center">
        <Link href={`/assets/${slug}`} passHref>
          <_Link fontWeight={700} color="primary.600" fontSize="sm">
            Details
          </_Link>
        </Link>
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<MoreHorizontalIcon boxSize={6} />}
            variant="link"
          />
          <MenuList>
            <MenuItem icon={<FlameIcon boxSize={5} />}>Burn</MenuItem>
            <MenuItem icon={<ArchiveIcon boxSize={4} />}>Archive</MenuItem>
            <MenuItem icon={<CheckCircleIcon boxSize={4} />}>Sell</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default NftsListItem;
