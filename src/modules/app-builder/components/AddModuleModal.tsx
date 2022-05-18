import React, { FC, useState } from "react";
import {
  Modal,
  ModalOverlay,
  Text,
  Box,
  Circle,
  ModalContent,
  Flex,
  ModalBody,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Button,
  Menu,
  MenuList,
  MenuItem,
  HStack,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";

import {
  PlusIcon,
  ScanIcon,
  TimeIcon,
  SearchIcon,
  CustomMenuButton,
} from "@/modules/common";

import { Server as ModuleIcon } from "lucide-react";

type AdoItem = {
  $id: string;
  class: string;
  classifier: string;
  title: string;
  description: string;
  source: string;
  documentation: string;
  version: string;
  "estimated-cost": string;
  "estimated-cost-denom": string;
  "coming-soon": string;
};

interface AddModuleModalItemProps {
  data: AdoItem;
  isActive: boolean;
  onClick: () => void;
}

function AddModuleModalItem({
  data,
  onClick,
  isActive = false,
}: AddModuleModalItemProps) {
  const { title, description, documentation, version } = data;

  const newIcon = React.cloneElement(<PlusIcon />, {
    color: "module.600",
    boxSize: 6,
  });

  return (
    <chakra.button
      textAlign="left"
      p={4}
      border="1px solid"
      borderColor={isActive ? "module.600" : "gray.300"}
      borderRadius="lg"
      _hover={{ borderColor: "module.600", boxShadow: "outline" }}
      onClick={onClick}
    >
      <Flex>
        <Box mr={4}>
          <Flex
            justify="center"
            align="center"
            borderRadius="lg"
            bg="module.100"
            p={2}
          >
            {newIcon}
          </Flex>
        </Box>
        <Box flex={1}>
          <Text textStyle="bold">{title}</Text>
          <Text textStyle="light" my={1}>
            {description}
          </Text>
          {/* <a href={documentation} target="_blank" rel="noreferrer"> */}
          <Text textStyle="light">{documentation}</Text>
          {/* </a> */}
        </Box>
        <Text textStyle="light">{version}</Text>
      </Flex>
    </chakra.button>
  );
}

// Mock data
const ITEMS = [
  {
    $id: "rates",
    class: "module",
    classifier: "sales",
    title: "Rates",
    description: "Rates descriptions",
    icon: <TimeIcon />,
    source: "rates/0.1.0/rates",
    documentation:
      "https://docs.andromedaprotocol.io/andromeda/ado-classes/rates",
    version: "0.1.0",
    "estimated-cost": "",
    "estimated-cost-denom": "",
    "coming-soon": "",
  },
  {
    $id: "royalties",
    class: "module",
    classifier: "Sale",
    title: "Royalties",
    description:
      "Set Royalties for your ADO, paid to specified Wallet Addresses.",
    source: "ado-module/royalties",
    documentation: "",
    version: "0.1.0",
    "estimated-cost": "",
    "estimated-cost-denom": "",
    "coming-soon": "",
  },
  {
    $id: "taxes",
    class: "module",
    classifier: "Sale",
    title: "Add Built-In Taxes",
    description:
      "Fees built into tax the ADO at point of sale, paid to specified Wallet Addresses.",
    source: "ado-module/taxes",
    documentation: "",
    version: "0.1.0",
    "estimated-cost": "",
    "estimated-cost-denom": "",
    "coming-soon": "",
  },
  {
    $id: "addresslist",
    class: "module",
    classifier: "AddressList",
    title: "AddressList",
    description: "descriptions",
    source: "addresslist/0.1.0/addresslist",
    documentation: "",
    version: "0.1.0",
    "estimated-cost": "",
    "estimated-cost-denom": "",
    "coming-soon": "",
  },
  {
    $id: "whitelist",
    class: "module",
    classifier: "security",
    title: "Whitelist Addressess",
    description:
      "Set Wallet Addresses that are allowed to interact with the ADO.",
    source: "ado-module/whitelist",
    documentation: "",
    version: "0.1.0",
    "estimated-cost": "",
    "estimated-cost-denom": "",
    "coming-soon": "",
  },
  {
    $id: "blacklist",
    class: "module",
    classifier: "security",
    title: "Blacklist Addressess",
    description:
      "Set Wallet Addresses that are not allowed to interact with the ADO.",
    source: "ado-module/blacklist",
    documentation: "",
    version: "0.1.0",
    "estimated-cost": "",
    "estimated-cost-denom": "",
    "coming-soon": "",
  },
  {
    class: "module",
    classifier: "sale",
    title: "Support Receipts",
    description:
      "Add the ability to generate receipts which store event history.",
    $id: "receipt",
    source: "receipt/0.1.0/receipt",
    documentation: "",
    version: "0.1.0",
    "estimated-cost": "",
    "estimated-cost-denom": "",
    "coming-soon": "",
  },
  {
    class: "module",
    classifier: "Sale",
    title: "Accept Offers",
    description: "Allow buyers to place offers on NFT Collectibles.",
    $id: "cw721-offers",
    source: "cw721-offers/0.1.0/cw721-offers",
    documentation: "",
    version: "0.1.0",
    "estimated-cost": "",
    "estimated-cost-denom": "",
    "coming-soon": "",
  },
];
const oldITEMS = [
  {
    id: 1,
    icon: <ScanIcon />,
    name: "Splitter",
    desc: "Assign a percentage to certain recipients.",
    isComingSoon: false,
  },
  {
    id: 2,
    icon: <TimeIcon />,
    name: "Timelock",
    desc: "Lock actions for a specified duration.",
    isComingSoon: false,
  },
  {
    id: 3,
    icon: <ScanIcon />,
    name: "Metadata",
    desc: "Create a transaction record reciept.",
    isComingSoon: false,
  },
  {
    id: 4,
    icon: <ScanIcon />,
    name: "Receipt",
    desc: "Add the metadata information for your NFT.",
    isComingSoon: true,
  },
  {
    id: 5,
    icon: <ScanIcon />,
    name: "Splitter",
    desc: "Assign a percentage to certain recipients.",
    isComingSoon: false,
  },
  {
    id: 6,
    icon: <TimeIcon />,
    name: "Timelock",
    desc: "Lock actions for a specified duration.",
    isComingSoon: false,
  },
  {
    id: 7,
    icon: <ScanIcon />,
    name: "Metadata",
    desc: "Create a transaction record reciept.",
    isComingSoon: false,
  },
  {
    id: 8,
    icon: <ScanIcon />,
    name: "Receipt",
    desc: "Add the metadata information for your NFT.",
    isComingSoon: true,
  },
];

// TODO: This modal need an API to get the list of ADOs and to add a module
function AddModuleModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState("");

  function loadModule() {
    //selectModule(selected);
    onClose();
    //alert("Load: " + selected);
    props.setLoadModule(selected);
  }

  return (
    <>
      <a href="#">
        <Circle
          size="36px"
          bgGradient="radial(primary.500, module.600)"
          color="white"
          onClick={onOpen}
        >
          <Icon as={ModuleIcon} />
        </Circle>
      </a>
      {/* <Button
        colorScheme="module"
        onClick={onOpen}
        py={8}
        variant="ghost"
        leftIcon={<PlusIcon boxSize={6} />}
        isFullWidth
      >
        Add Module
      </Button> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="700px">
          <ModalBody px={0} pb={0}>
            <Box px={6} mb={8}>
              <Text textStyle="h1">Add Module</Text>
            </Box>

            <HStack mb={4} spacing={4} pl={6} pr={7}>
              <InputGroup flex={1} placeholder="Search names and descriptions">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input placeholder="Search names and descriptions" />
              </InputGroup>
              <Menu placement="bottom-end">
                <CustomMenuButton>Classifier</CustomMenuButton>
                <MenuList>
                  <MenuItem>Blockchain</MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <Box
              maxH="375px"
              overflowX="auto"
              px={6}
              pb={6}
              sx={{
                "&": {
                  scrollbarColor: "#155eef transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  bg: "#155eef",
                },
              }}
            >
              <VStack spacing={3} align="normal">
                {ITEMS.map((item) => {
                  return (
                    <AddModuleModalItem
                      key={item.$id}
                      data={item}
                      isActive={selected == item.source}
                      onClick={() => setSelected(item.source)}
                    />
                  );
                })}
              </VStack>
            </Box>
            <Flex
              p={6}
              justify="space-between"
              // boxShadow="0px -1px 20px rgba(10, 10, 31, 0.2);"
            >
              <Box textAlign="right">
                {/* <Text textStyle="light">Estimated Fee</Text>
                <Text textStyle="light" color="module.600">
                  0.15 UST
                </Text> */}
              </Box>
              <Button
                colorScheme="module"
                leftIcon={<PlusIcon boxSize={6} />}
                onClick={loadModule}
              >
                Add Module
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddModuleModal;
