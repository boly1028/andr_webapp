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
  SparklesIcon,
  MoreHorizontalIcon,
  ExternalLink,
  ExternalLinkIcon,
  ShareIcon,
  HeartIcon,
  TagIcon,
} from "@/modules/common";
import {
  type CollectionItem,
  ItemSummary,
  ItemProperties,
} from "@/modules/marketplace";

interface ItemPageProps {
  data: CollectionItem;
}

const ItemPage: FC<ItemPageProps> = ({ data }) => {
  const { name, image, type } = data;

  return (
    <Box>
      <Breadcrumb
        spacing={4}
        separator={<ChevronRightIcon boxSize={4} color="gray.300" />}
        mb={8}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            <SparklesIcon boxSize={5} mb={1} color="gray.500" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#" color="gray.500" fontWeight={500}>
            Collections
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#" color="gray.500" fontWeight={500}>
            Generic
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#" color="gray.500" fontWeight={500}>
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex>
        <Box w="600px" mr={10}>
          <Image src={image} borderRadius="lg" alt="NFT Asset" />
        </Box>
        <Box flex="1">
          <Flex justify="space-between" align="center" mb={3}>
            <Heading fontWeight={700}>{name}</Heading>
            <HStack>
              <IconButton
                aria-label="Like"
                icon={<HeartIcon boxSize={5} color="gray.500" />}
                variant="outline"
              />
              <IconButton
                aria-label="Share"
                icon={<ShareIcon boxSize={5} color="gray.500" />}
                variant="outline"
              />
              <IconButton
                aria-label="Link"
                icon={<ExternalLinkIcon boxSize={4} color="gray.500" />}
                variant="outline"
              />
              <IconButton
                aria-label="Menu"
                icon={<MoreHorizontalIcon boxSize={6} color="gray.500" />}
                variant="outline"
              />
            </HStack>
          </Flex>

          <HStack color="gray.500" fontSize="sm" mb={3}>
            <Text>{type}</Text>
            <Text>.</Text>
            <Text>
              Owned by{" "}
              <ExternalLink href="https://terrasco.pe" label="terra10x45.." />
            </Text>
          </HStack>

          <Box
            mt={8}
            mb={8}
            p={7}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="lg"
          >
            <Flex justify="space-between" mb={5}>
              <Box>
                <Text color="gray.500" fontSize="sm">
                  Current price
                </Text>
                <Text color="primary.600" fontWeight={700} fontSize="2xl">
                  89.99 UST
                </Text>
              </Box>
              <HStack>
                <Box>
                  <Text color="gray.500" fontSize="sm">
                    Collection
                  </Text>
                  <Text color="gray.700" fontWeight={600}>
                    Generic
                  </Text>
                </Box>
                <Image
                  boxSize={10}
                  borderRadius="full"
                  src="https://lh3.googleusercontent.com/lfLT98fGLJ_vgblkfwE6sttMVSqVTdf8oWIKEbTi7Y_TejgNUKoNDps07fjRMHdyX3Fy1azhUZ5zJG_As98UGq7BwSAs8GeME1T_9w=w600"
                />
              </HStack>
            </Flex>
            <HStack>
              <Button colorScheme="purple" size="xl" minW={36}>
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="xl"
                minW={36}
                leftIcon={<TagIcon boxSize={5} />}
              >
                Make Offer
              </Button>
            </HStack>
          </Box>

          <ItemSummary />

          <Box mt={8}>
            <ItemProperties />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ItemPage;
