import React, { FC } from "react";
import {
  Flex,
  Box,
  Text,
  Container,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  VStack,
  HStack,
  Link,
  Image,
  Menu,
  MenuList,
  MenuItem,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import {
  SlidersIcon,
  CustomMenuButton,
  ClockIcon,
  ChevronDownIcon,
  FlameIcon,
  LayoutGridIcon,
  DollarSignIcon,
  SortDescIcon,
  ChevronRightIcon,
  ExternalLink,
  SparklesIcon,
} from "@/modules/common";
import {
  Trending,
  CollectionData,
  NFT_TRENDING,
  NftItem,
} from "@/modules/marketplace";

const STATS = [
  {
    label: "Highest Sale",
    value: "459.3K UST",
  },
  {
    label: "Floor Price",
    value: "67.1K UST",
  },
  {
    label: "Market Cap",
    value: "891.4M UST",
  },
  {
    label: "Items",
    value: "10K",
  },
  {
    label: "Owners",
    value: "5,992",
  },
  {
    label: "Total Volume",
    value: "267.9 UST",
  },
];

interface CollectionStatProps {
  data: {
    label: string;
    value: string;
  };
}

function CollectionStat({ data }: CollectionStatProps) {
  const { label, value } = data;

  return (
    <Box>
      <Text textStyle="light">{label}</Text>
      <Text color="gray.700" fontSize="lg" fontWeight={700}>
        {value}
      </Text>
    </Box>
  );
}

interface Props {
  data: CollectionData;
}

function CollectionPage({ data }: Props) {
  const { name, image } = data;

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
            Assets
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#" color="gray.500" fontWeight={500}>
            {name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box bg="gray.50" py={8} mt={24}>
        <VStack maxW="container.md" mx="auto" spacing={6}>
          <Image
            src={image}
            alt="logo"
            boxSize={120}
            mt={-24}
            borderRadius="full"
          />

          <Text textStyle="h1" fontSize="2xl">
            {name}
          </Text>

          <Box
            p={2.5}
            borderRadius="lg"
            bg="white"
            border="1px solid"
            borderColor="gray.300"
          >
            <ExternalLink
              href="https://google.com"
              label="terra17zr62cdwl5x5ktrrfrv.."
              color="gray.700"
            />
          </Box>

          <HStack
            spacing={10}
            p={4}
            borderRadius="lg"
            bg="white"
            border="1px solid"
            borderColor="gray.300"
          >
            {STATS.map((data) => (
              <CollectionStat key={data.label} data={data} />
            ))}
          </HStack>

          <Container>
            <Text textAlign="center" color="gray.700">
              A collection of 10,000 utility-enabled PFPs that feature a richly
              diverse and unique pool of rarity-powered traits. What&apos;s more,
              each Moonbird unlocks private club membership and additional
              benefits the longer you hold them. We call it nesting – because,
              obviously..{" "}
              <Link color="primary.600" fontWeight={600}>
                Read more
              </Link>
            </Text>
          </Container>
        </VStack>
      </Box>

      <Tabs mt={8} colorScheme="purple">
        <TabList>
          <Tab>Items</Tab>
          <Tab>Activity</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex mb={8} justify="space-between">
              <HStack spacing={4}>
                <Menu placement="bottom-end">
                  <CustomMenuButton
                    leftIcon={<LayoutGridIcon boxSize={5} color="gray.500" />}
                  >
                    Category
                  </CustomMenuButton>
                  <MenuList>
                    <MenuItem icon={<ClockIcon boxSize={5} />}>
                      Blockchain
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Menu placement="bottom-end">
                  <CustomMenuButton
                    leftIcon={<SlidersIcon boxSize={5} color="gray.500" />}
                  >
                    Properties
                  </CustomMenuButton>
                  <MenuList>
                    <MenuItem icon={<ClockIcon boxSize={5} />}>
                      Blockchain
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Menu placement="bottom-end">
                  <CustomMenuButton
                    leftIcon={<FlameIcon boxSize={5} color="gray.500" />}
                  >
                    Sales Type
                  </CustomMenuButton>
                  <MenuList>
                    <MenuItem icon={<ClockIcon boxSize={5} />}>
                      Blockchain
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Menu placement="bottom-end">
                  <CustomMenuButton
                    leftIcon={<DollarSignIcon boxSize={5} color="gray.500" />}
                  >
                    Price range
                  </CustomMenuButton>
                  <MenuList>
                    <MenuItem icon={<ClockIcon boxSize={5} />}>
                      Blockchain
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
              <Menu placement="bottom-end">
                <CustomMenuButton
                  leftIcon={<SortDescIcon boxSize={5} color="gray.500" />}
                >
                  Recently added
                </CustomMenuButton>
                <MenuList>
                  <MenuItem icon={<ClockIcon boxSize={5} />}>
                    Blockchain
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <SimpleGrid columns={4} spacing={4}>
              {NFT_TRENDING.map((data) => {
                return <NftItem key={data.id} data={data} />;
              })}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>Activity</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default CollectionPage;
