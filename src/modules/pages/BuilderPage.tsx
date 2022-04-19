import React from "react";
import { Box, Text, Heading, SimpleGrid } from "@chakra-ui/react";

import { BuilderListItem, AdoProps } from "@/modules/builder";

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

const BuilderPage = () => {
  return (
    <Box maxW="container.lg" mx="auto" px={{ base: 4, md: 8 }}>
      <Heading fontWeight="600" fontSize="xl" my={2}>
        ADO & NFT Builder Templates
      </Heading>
      <Text fontSize="sm" color="gray.500">
        Quickly create and publish NFT collectibles, DeFi instruments and
        generic ADOs from starter templates!
      </Text>
      <SimpleGrid columns={3} spacing="4" my={8}>
        {ADOS.map((ado) => (
          <BuilderListItem key={ado.name} ado={ado} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BuilderPage;
