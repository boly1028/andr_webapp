import React, { FC } from "react";
import {
  Flex,
  Box,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import {
  ArchiveIcon,
  CheckCircleIcon,
  FlameIcon,
  MoreHorizontalIcon,
} from "@/modules/common";

interface CardFooterProps {
  data: {
    image: string;
    title: string;
    subtitle: string;
    value: string;
  };
}

const CardFooter: FC<CardFooterProps> = ({ data }) => {
  const { title, subtitle, value, image } = data;

  return (
    <>
      <Flex justify="space-between" mb={3}>
        <Box>
          <Text fontSize="sm" fontWeight={700} color="gray.700" mb={1.5}>
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {subtitle}
          </Text>
        </Box>
        <Box>
          <Image src={image} alt="logo" boxSize={6} borderRadius="full" />
        </Box>
      </Flex>

      <Flex justify="space-between" align="center">
        <Text fontWeight={700} color="primary.600" fontSize="sm">
          {value}
        </Text>
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
    </>
  );
};

export default CardFooter;
