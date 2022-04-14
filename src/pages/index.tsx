import React, { FC } from "react";

import {
  Box,
  Circle,
  Flex,
  Spacer,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  Icon,
  useColorModeValue,
  Heading,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";

import {
  Check as CheckIcon,
  Image as ImageIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";

type AdoProps = {
  name: string;
  icon: string;
  description: string;
  opts: string[];
  disabled?: boolean;
};

const ADOS: Array<AdoProps> = [
  {
    name: "NFT Collectible",
    icon: "",
    description:
      "Create the most advanced and feature rich NFT Collectible in the world.",
    opts: ["Add royalties", "Black/White list", "Taxes", "Robust metadata"],
  },
  {
    name: "Splitter ADO",
    icon: "",
    description:
      "When funds are sent to this ADO, they will be split among specified address.",
    opts: ["Multi-Address Routing", "Whitelisting"],
  },
  {
    name: "Timelock ADO",
    icon: "",
    description:
      "An escrow styled ADO allowing users to lock funds until a specified time or block height.",
    opts: ["Hold till date", "Hold till block height", "Whitelisting"],
  },
  {
    name: "Publish Token",
    icon: "",
    description:
      "Some tempaltes are also designated for modifying pre-existing ADOs",
    opts: ["Shows a modifier panel"],
  },
  {
    name: "A Blank Canvas",
    icon: "",
    description:
      "You don't have to use a template! Start from scratch building out your own ADO structure to be just the way you like it.",
    opts: [
      "Select your Base ADO functionality",
      "Add on your prefered modules",
      "Save as a template",
      "Publish and use!",
    ],
  },
  {
    name: "Address List ADO",
    icon: "",
    description:
      "An ADO which stores a queryable list of addresses. Which can be assigned to most other ADO address fields.",
    opts: [
      "Assignable to Whitelists",
      "Assignable to Blacklists",
      "Assignable to Splitters",
      "Assignable to Timelocks",
    ],
    disabled: true,
  },
  {
    name: "Load Your Own Template",
    icon: "",
    description:
      "Load your own flex template to launch or relaunch a previous build including entered data!",
    opts: [
      "Save your progress",
      "Collaborate with a team",
      "Use other's templates",
      "Pre-entered data supported",
    ],
    disabled: true,
  },
  {
    name: "DeFi Instruments",
    icon: "",
    description: "Setup components for financial automation",
    opts: ["MIR", "ANC", "MIR & ANC", "(more in dev)"],
    disabled: true,
  },
  {
    name: "Generic ADO",
    icon: "",
    description: "Define simple data values to be utilized in other ADOs",
    opts: [
      "Storage",
      "Specific values",
      "Primitive functions",
      "(more in dev)",
    ],
    disabled: true,
  },
];

type Props = {
  ado: AdoProps;
};

const Card: FC<Props> = ({ ado }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      border="1px"
      borderColor={"gray.300"}
      rounded={"xl"}
      overflow={"hidden"}
    >
      <Flex
        direction="column"
        height="100%"
        bg={useColorModeValue("white", "gray.900")}
        p={4}
      >
        <Box>
          <HStack spacing={4}>
            <Circle size="36px" bg="purple.600" color="white">
              <Icon as={ImageIcon} color="white" />
            </Circle>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"xl"}
              fontFamily={"body"}
              fontWeight={600}
            >
              {ado.name}
            </Heading>
          </HStack>
          <Text color={"gray.500"} fontSize="sm" my={4}>
            {ado.description}
          </Text>

          <List spacing={3}>
            {ado.opts.map((opt) => (
              <ListItem key={opt}>
                <Text color={"gray.500"} fontSize="sm">
                  <ListIcon as={CheckIcon} color="purple.400" />
                  {opt}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
        <Spacer />
        <Button
          fontWeight={500}
          fontSize="md"
          mt={10}
          w={"full"}
          bg={"purple.600"}
          color={"white"}
          rounded={"xl"}
          size="lg"
          rightIcon={ado.disabled ? undefined : <ArrowRightIcon />}
          _hover={{
            bg: "purple.700",
          }}
          _focus={{
            bg: "purple.800",
          }}
          isActive={ado.disabled}
        >
          {ado.disabled ? "Coming Soon" : "Get Started"}
        </Button>
      </Flex>
    </Box>
  );
};

export default function Index() {
  return (
    <Box maxW="960px" mx="auto" px={{ base: 4, md: 8 }}>
      <Heading fontWeight="600" fontSize="xl" my={2}>
        ADO & NFT Builder Templates
      </Heading>
      <Text fontSize="sm" color="gray.500">
        Quickly create and publish NFT collectibles, DeFi instruments and
        generic ADOs from starter templates!
      </Text>
      <SimpleGrid minChildWidth="240px" spacing="20px" my={8}>
        {ADOS.map((ado) => (
          <Card key={ado.name} ado={ado} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
