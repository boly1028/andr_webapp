import React, { FC } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  Button,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
} from "@chakra-ui/react";

import {
  ChevronRightIcon,
  FolderOpenIcon,
  MoreHorizontalIcon,
  ExternalLink,
} from "@/modules/common";
import { type NftAsset, NftAssetSummary } from "@/modules/assets";

interface AssetPageProps {
  data: NftAsset;
}

const AssetPage: FC<AssetPageProps> = ({ data }) => {
  const { name, image, type } = data;

  return (
    <Box maxW="container.lg">
      <Breadcrumb
        spacing={4}
        separator={<ChevronRightIcon boxSize={4} color="gray.300" />}
        mb={8}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            <FolderOpenIcon boxSize={5} mb={1} color="gray.500" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#" color="gray.500" fontWeight={500}>
            Assets
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#" color="gray.500" fontWeight={500}>
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex>
        <Box w="360px" mr={10}>
          <Image src={image} borderRadius="lg" alt="NFT Asset" />
        </Box>

        <Box flex="1">
          <Flex justify="space-between" align="center" mb={3}>
            <Heading fontWeight={700}>{name}</Heading>
            <HStack>
              <IconButton
                aria-label="Menu"
                icon={<MoreHorizontalIcon boxSize={6} />}
                variant="outline"
              />
              <Button colorScheme="purple">Sell Item</Button>
            </HStack>
          </Flex>

          <Text color="primary.600" fontWeight={700} mb={3} fontSize="xl">
            89.99 UST
          </Text>

          <HStack color="gray.500" fontSize="sm" mb={3}>
            <Text>{type}</Text>
            <Text>.</Text>
            <Text>Terra chain</Text>
            <Text>.</Text>
            <Text>
              Owned by{" "}
              <ExternalLink href="https://terrasco.pe" label="terra10x45.." />
            </Text>
          </HStack>

          <Text color="gray.700" fontSize="sm" mb={8}>
            High-flying, dapper Super Snoop. Makes you feel the way you need to
            feel.
          </Text>

          <NftAssetSummary />
        </Box>
      </Flex>
    </Box>
  );
};

export default AssetPage;
