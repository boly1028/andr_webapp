import React, { FC, useState } from "react";
import {
  Modal,
  ModalOverlay,
  Text,
  Box,
  ModalContent,
  Flex,
  ModalBody,
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

type AdoItem = {
  id: number;
  icon: React.ReactElement;
  name: string;
  desc: string;
  isComingSoon: boolean;
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
  const { name, icon, desc } = data;

  const newIcon = React.cloneElement(icon, {
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
          <Text textStyle="bold">{name}</Text>
          <Text textStyle="light" my={1}>
            {desc}
          </Text>
          <Text textStyle="light">Lorem ipsum dolor sit amet </Text>
        </Box>
        <Text textStyle="light">TL-1.2</Text>
      </Flex>
    </chakra.button>
  );
}

// Mock data
const ITEMS = [
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
function AddModuleModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <Button
        colorScheme="module"
        onClick={onOpen}
        py={8}
        variant="ghost"
        leftIcon={<PlusIcon boxSize={6} />}
        isFullWidth
      >
        Add Module
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="700px">
          <ModalBody px={0} pb={0}>
            <Box px={6} mb={8}>
              <Text textStyle="h1">Add Module</Text>
            </Box>

            <HStack mb={4} spacing={4} pl={6} pr={7}>
              <InputGroup flex={1} placeholder="Collection, item or user">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input placeholder="Collection, item or user" />
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
                      key={item.id}
                      data={item}
                      isActive={selected == item.id}
                      onClick={() => setSelected(item.id)}
                    />
                  );
                })}
              </VStack>
            </Box>
            <Flex
              p={6}
              justify="space-between"
              boxShadow="0px -1px 20px rgba(10, 10, 31, 0.2);"
            >
              <Box textAlign="right">
                <Text textStyle="light">Estimated Fee</Text>
                <Text textStyle="light" color="module.600">
                  0.15 UST
                </Text>
              </Box>
              <Button colorScheme="module" leftIcon={<PlusIcon boxSize={6} />}>
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
