import React, { FC } from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Image,
  Flex,
  HStack,
  IconButton,
} from "@chakra-ui/react";

import {
  ListIcon,
  TagIcon,
  BarChartIcon,
  GlobeIcon,
  ExternalLinkIcon,
  TwitterIcon,
  DiscordIcon,
  ExternalLink,
} from "@/modules/common";

interface NftPropertiesItemProps {
  label: string;
  desc: string;
  value: string;
}

const NftPropertiesItem: FC<NftPropertiesItemProps> = ({
  label,
  desc,
  value,
}) => {
  return (
    <Box fontSize="sm">
      <Text color="primary.600" fontWeight={600} mb={1}>
        {label}
      </Text>
      <Flex justify="space-between">
        <Text color="gray.700" fontWeight={700} fontSize="sm">
          {desc}
        </Text>
        <Text color="gray.500">{value}</Text>
      </Flex>
    </Box>
  );
};

const ItemSummary = () => {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <HStack flex="1">
              <ListIcon boxSize={6} />
              <Text>Details</Text>
            </HStack>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <HStack mb={4}>
            <Image
              boxSize={10}
              borderRadius="full"
              src="https://lh3.googleusercontent.com/lfLT98fGLJ_vgblkfwE6sttMVSqVTdf8oWIKEbTi7Y_TejgNUKoNDps07fjRMHdyX3Fy1azhUZ5zJG_As98UGq7BwSAs8GeME1T_9w=w600"
              alt="Collection Logo"
            />
            <Text color="gray.700" fontWeight={600}>
              Generic
            </Text>
          </HStack>
          <Text fontSize="sm">
            A collection of 10,000 utility-enabled PFPs that feature a richly
            diverse and unique pool of rarity-powered traits. What&apos;s more, each
            Moonbird unlocks private club membership and additional benefits the
            longer you hold them. We call it nesting – because, obviously.. Read
            more
          </Text>
          <HStack mt={5}>
            <IconButton
              aria-label="Explore"
              icon={<GlobeIcon color="gray.500" boxSize={5} />}
              variant="outline"
            />
            <IconButton
              aria-label="Twitter"
              icon={<TwitterIcon color="gray.500" boxSize={5} />}
              variant="outline"
            />
            <IconButton
              aria-label="Discord"
              icon={<DiscordIcon color="gray.500" boxSize={5} />}
              variant="outline"
            />
            <IconButton
              aria-label="External"
              icon={<ExternalLinkIcon color="gray.500" boxSize={5} />}
              variant="outline"
            />
          </HStack>

          <Divider my={5} color="gray.300" opacity={1} />

          <Flex justify="space-between" mb={4}>
            <Text textStyle="light">Contract Address</Text>
            <Box>
              <ExternalLink label="terra10x405.." href="https://google.com" />
            </Box>
          </Flex>
          <Flex justify="space-between" mb={4}>
            <Text textStyle="light">Token ID</Text>
            <Text color="gray.700" fontWeight={500}>
              2403
            </Text>
          </Flex>
          <Flex justify="space-between">
            <Text textStyle="light">Blockchain</Text>
            <Text color="gray.700" fontWeight={500}>
              Terra
            </Text>
          </Flex>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <HStack flex="1">
              <BarChartIcon boxSize={6} />
              <Text>Price History</Text>
            </HStack>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. */}
          </Text>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <HStack flex="1">
              <TagIcon boxSize={6} />
              <Text>Offers</Text>
            </HStack>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Box mb={3} pb={3} borderBottom="1px solid" borderColor="gray.200">
            <NftPropertiesItem
              label="Eyes"
              desc="Golden Sides Tinted Sunglasses"
              value="9.3% rarity"
            />
          </Box>
          <Box mb={3} pb={3} borderBottom="1px solid" borderColor="gray.200">
            <NftPropertiesItem
              label="Hair"
              desc="Dark Tails Hair"
              value="9.6% rarity"
            />
          </Box>
          <Box mb={3} pb={3} borderBottom="1px solid" borderColor="gray.200">
            <NftPropertiesItem label="Head" desc="Human" value="95.5% rarity" />
          </Box>
          <Box mb={3} pb={3} borderBottom="1px solid" borderColor="gray.200">
            <NftPropertiesItem
              label="Mouth"
              desc="Geryish Beard Calm"
              value="6% rarity"
            />
          </Box>
          <NftPropertiesItem
            label="Pants"
            desc="Black Pants"
            value="9.6% rarity"
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ItemSummary;
