import React, { FC, useState, useCallback } from "react";
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

import { JSONSchema7 } from "json-schema";
import { v4 as uuidv4 } from "uuid";

import {
  PlusIcon,
  ScanIcon,
  TimeIcon,
  SearchIcon,
  CustomMenuButton,
} from "@/modules/common";

import { FlexBuilderTemplateModuleProps } from "@/modules/flex-builder/types";

interface AddModuleModalItemProps {
  data: JSONSchema7 | undefined;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function AddModuleModalItem({
  data,
  onClick,
  disabled = false,
  isActive = false,
}: AddModuleModalItemProps) {
  const newIcon = React.cloneElement(<ScanIcon />, {
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
          <Text textStyle="bold">{data.title}</Text>
          <Text textStyle="light" my={1}>
            {data.description}
          </Text>
          <Text textStyle="light">Lorem ipsum dolor sit amet </Text>
        </Box>
        <Text textStyle="light">TL-1.2</Text>
      </Flex>
    </chakra.button>
  );
}

interface AddModuleModalProps {
  items: FlexBuilderTemplateModuleProps[];
  onAdd: (item: FlexBuilderTemplateModuleProps) => void;
}

// TODO: This modal need an API to get the list of ADOs and to add a module
function AddModuleModal({ onAdd, items }: AddModuleModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] =
    useState<FlexBuilderTemplateModuleProps | null>(null);

  const handleAdd = useCallback(() => {
    if (selected) {
      onAdd(selected);
      onClose();
    }
  }, [selected, onAdd, onClose]);

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
                {items.map((item) => {
                  item.id = uuidv4();
                  return (
                    <AddModuleModalItem
                      key={item.id}
                      disabled={item.disabled}
                      data={item.schema["schema"]}
                      isActive={selected?.id == item.id}
                      onClick={() => {
                        if (!item.disabled) setSelected(item);
                      }}
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
              <Button
                onClick={handleAdd}
                colorScheme="module"
                leftIcon={<PlusIcon boxSize={6} />}
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
