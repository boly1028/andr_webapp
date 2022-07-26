import React, { useState, useCallback } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useDisclosure } from "@chakra-ui/react";

import { FlexBuilderTemplateModuleProps } from "@/modules/flex-builder/types";
//import SchemaField from "@rjsf/core/lib/components/fields/SchemaField";

import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Select,
  Text,
  VStack,
} from "@/theme/ui-elements";

import { PlusIcon, SearchIcon } from "@/theme/icons";
import * as classifierIconList from "@/theme/icons/classifiers"; //Load classifier icon list for dynamic assignamnets (redeclared as classifierIcons:any later)

interface AddModuleModalItemProps {
  data: any;
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
  // Converting imported icon object to type any to avoid string based key reference conflicts in dynamic assosciation calls
  const classifierIcons: any = classifierIconList;

  // Assign classifier data to variables for eaiser legibility and case correction on icon assignments
  const classIconType = data?.schema?.class;
  const classifierIconType = _.lowerCase(data?.schema?.classifier);

  // Debugging log
  // console.log("AddModuleModalItem::disabled", disabled);
  // if (!classifierIconType) {
  //   console.log("Icon by Class", classIconType);
  // } else {
  //   console.log("Icon by Classifier:", classifierIconType);
  // }

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
          {/* Swap background color based on defined class */}
          <Flex
            justify="center"
            align="center"
            borderRadius="lg"
            bg={`${data?.schema?.class}` + ".100"}
            p={2}
          >
            {/* Disable auto loading icon for icon variance based on class and classifier
            {newIcon} */}
            {/* Swap Icon color based on defined class */}

            {/* <ScanIcon color={`${data?.schema?.class}` + ".600"} boxSize={6} /> */}

            {classifierIconType ? (
              <Icon
                as={classifierIcons[classifierIconType]}
                color={`${classIconType}` + ".600"}
                boxSize={6}
              />
            ) : (
              <Icon
                as={classifierIcons[classIconType]}
                color={`${classIconType}` + ".600"}
                boxSize={6}
              />
            )}
          </Flex>
        </Box>
        <Box flex={1}>
          <Text textStyle="bold">{data?.schema?.title}</Text>
          <Text textStyle="light" my={1}>
            {data?.schema?.description}
          </Text>
          <Text textStyle="light"> </Text>
        </Box>
        {/* Use lodash to capitalize first letter of class */}
        <Text textStyle="light">{_.upperFirst(data?.schema?.class)}</Text>
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
    //Reset updateFilters status before loading
    const docInput = document?.getElementById(
      "class-selector",
    ) as HTMLInputElement; // Declaration of document field type as HTMLInputElement to acces .value without conflict
    docInput.value = "all"; //Set selection form field value to variable for comparatives
    updateFilters(); // Load filters for reset for next isOpen()

    // console.log("Selected");
    // console.log(selected);

    if (selected) {
      onAdd(selected);
      onClose();
    }
  }, [selected, onAdd, onClose]);

  // Debugging Logs
  // console.log("template.modules:");
  // console.log(items);

  const [filteredItems, setFilteredItems] = useState<any[]>(items); //Value to reduce returned panel options by filters

  //Address filtering controls to pre-sort items by class type & textual contents
  function updateFilters() {
    let qrySearchedItems = items;

    // Filter panel selection options by $Class
    const classInput = document?.getElementById(
      "class-selector",
    ) as HTMLInputElement; // Declaration of document field type as HTMLInputElement to acces .value without conflict
    const classValue = classInput.value; //Set selection form field value to variable for comparatives
    if (classValue !== "all") {
      qrySearchedItems = _.filter(qrySearchedItems, function (item) {
        return _.some(item.schema, { class: classValue });
      });
    }

    // Filter panel selection options by text found within title and description fields
    const searchInput = document?.getElementById(
      "search-text",
    ) as HTMLInputElement; // Declaration of document field type as HTMLInputElement to acces .value without conflict
    const searchValue = searchInput.value; //Set selection form field value to variable for comparatives
    // When text entered is not empty
    // console.log("Search Value: ", searchValue);
    if (searchValue !== "") {
      // console.log("Search Filter on: ", qrySearchedItems);
      qrySearchedItems = _.filter(qrySearchedItems, function (item) {
        // Filter items which contain a lowercase version of the text in either the panel description or title
        return (
          _.includes(
            item?.schema?.schema.title.toString().toLowerCase(),
            searchValue.toLowerCase(),
          ) ||
          _.includes(
            item?.schema?.schema?.description?.toString().toLowerCase(),
            searchValue.toLowerCase(),
          )
        );
      });
    }
    // } else {
    //   // Return an unsearched result
    //   setSearchedItems(filteredItems);
    // }

    setFilteredItems(qrySearchedItems);
    // updateTextSearch("forceUpdate");
    return;
  }

  return (
    <>
      <Button
        colorScheme="module"
        onClick={onOpen}
        py={8}
        variant="ghost"
        leftIcon={<Icon as={PlusIcon} boxSize={6} />}
        isFullWidth
      >
        Add Component
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="700px">
          <ModalBody px={0} pb={0}>
            <Box px={6} mb={8}>
              <Text textStyle="h1">Component Selection</Text>
            </Box>

            {/* Sorting and Filtering Controls */}
            <HStack mb={4} spacing={4} pl={6} pr={7}>
              {/* Text Filtering */}
              <InputGroup flex={1} placeholder="By title or description">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  id="search-text"
                  onChange={() => updateFilters()}
                  placeholder="By title or description"
                />
              </InputGroup>
              {/* Class Selection Filter */}
              <Select
                id="class-selector"
                size="lg"
                flex={1}
                onChange={() => updateFilters()}
                // onChange={() =>
                //   alert(document?.getElementById("class-selector")?.value)
                // }
              >
                <option value="all">Show All Components</option>
                <option value="baseADO">Base ADO</option>
                <option value="primitive">Primitive</option>
                <option value="module">Module</option>
              </Select>
              {/* <Menu placement="bottom-end">
                <CustomMenuButton>Component Type</CustomMenuButton>
                <MenuList>
                  <MenuItem>All</MenuItem>
                  <MenuItem>Base ADO</MenuItem>
                  <MenuItem>Primitive</MenuItem>
                  <MenuItem>Module</MenuItem>
                </MenuList>
              </Menu> */}
            </HStack>
            <Text>Showing Results for:</Text>
            <Divider />

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
                {filteredItems.map((item) => {
                  // console.log(item.schema);
                  item.id = uuidv4();
                  return (
                    <AddModuleModalItem
                      key={item.id}
                      disabled={item.disabled}
                      data={item.schema}
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
              pt={6}
              justify="space-between"
              borderTop="1px"
              borderColor="gray.200"
              // boxShadow="0px -1px 20px rgba(10, 10, 31, 0.2);"
            >
              <Box textAlign="right">
                {/* <Text textStyle="light">Estimated Fee</Text>
                <Text textStyle="light" color="module.600">
                  0.15 UST
                </Text> */}
              </Box>
              <Button
                isDisabled={!selected}
                onClick={handleAdd}
                colorScheme="module"
                leftIcon={<Icon as={PlusIcon} boxSize={6} />}
              >
                Add Component
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddModuleModal;
