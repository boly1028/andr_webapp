import React, { useState, useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import { Link, useDisclosure } from "@chakra-ui/react";

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

import { ExternalLink, PlusIcon, SearchIcon } from "@/theme/icons";
import ClassifierIcon from "@/theme/icons/classifiers";
import Fuse from "fuse.js";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { IAndromedaSchemaJSON, ITemplate } from "@/lib/schema/types";

interface AddModuleModalItemProps {
  data: IAndromedaSchemaJSON;
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
            <ClassifierIcon
              schemaClass={data?.schema?.class as any}
              schemaClassifier={data?.schema?.classifier as any}
              boxSize={6}
            />
          </Flex>
        </Box>
        <Box flex={1}>
          <Text textStyle="bold">{data?.schema?.title}</Text>
          <Text textStyle="light">{data?.schema?.description}</Text>
          <Link
            href={SITE_LINKS.documentation(data?.schema?.$id)}
            target="_blank"
            referrerPolicy="no-referrer"
            textStyle="light"
            color="blue.500"
            display="flex"
            alignItems="center"
            gap="1"
            flexDirection="row"
            w='min-content'
          >
            Documentation
            <ExternalLink width={16} />
          </Link>
        </Box>
        <Flex direction="column" gap={0} align="end">
          {/* Use lodash to capitalize first letter of class */}
          <Text textStyle="light">{_.upperFirst(data?.schema?.class)}</Text>
          <Text fontSize="xs" textStyle="light">
            {data?.schema?.$id ?? ""}@{data?.schema?.version ?? "0.0.0"}
          </Text>
        </Flex>
      </Flex>
    </chakra.button>
  );
}

interface AddModuleModalProps {
  items: NonNullable<ITemplate["modules"]>;
  onAdd: (item: IAndromedaSchemaJSON) => void;
}

// TODO: This modal need an API to get the list of ADOs and to add a module
function AddModuleModal({ onAdd, items }: AddModuleModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<
    AddModuleModalProps["items"][number] | null
  >(null);

  const fuse = useMemo(() => {
    const options: Fuse.IFuseOptions<AddModuleModalProps["items"][number]> = {
      keys: [
        {
          name: "id",
          getFn: (item) => item?.schema?.schema?.$id ?? "",
        },
        {
          name: "title",
          getFn: (item) => item?.schema?.schema?.title ?? "",
        },
        {
          name: "description",
          getFn: (item) => item?.schema?.schema?.description ?? "",
        },
      ],
      threshold: 0.4,
    };
    const _fuse = new Fuse(items, options);
    return _fuse;
  }, [items]);

  const [filteredItems, setFilteredItems] = useState(items); //Value to reduce returned panel options by filters

  const [searchText, setSearchText] = useState("");
  const [classText, setClassText] = useState<string>("all");

  useEffect(() => {
    setSearchText("");
    setClassText("all");
  }, [isOpen]);

  useEffect(() => {
    updateFilters(searchText, classText);
  }, [searchText, classText]);

  const handleAdd = useCallback(() => {
    if (selected?.schema) {
      onAdd(selected.schema);
      onClose();
    }
  }, [selected, onAdd, onClose]);

  // Debugging Logs
  // console.log("template.modules:");
  // console.log(items);

  //Address filtering controls to pre-sort items by class type & textual contents
  const updateFilters = useCallback(
    _.debounce((_search: string, _class: string) => {
      let qrySearchedItems =
        _search.length > 0
          ? fuse.search(_search).map((item) => item.item)
          : items;

      // Filter panel selection options by $Class
      //Set selection form field value to variable for comparatives
      if (_class !== "all") {
        qrySearchedItems = _.filter(qrySearchedItems, function (item) {
          return _.some(item.schema, { class: _class });
        });
      }
      setFilteredItems(qrySearchedItems);
      return;
    }, 500),
    [setFilteredItems, fuse, items],
  );

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
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="By title or description"
                />
              </InputGroup>
              {/* Class Selection Filter */}
              <Select
                id="class-selector"
                size="lg"
                flex={1}
                value={classText}
                onChange={(e) => setClassText(e.target.value)}
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
              <VStack spacing={3} align="normal" mt="4">
                {filteredItems.map((item) => {
                  if (!item.schema) return null;
                  return (
                    <AddModuleModalItem
                      // path is unique as we dont have key yet
                      key={item.path}
                      disabled={item.disabled}
                      data={item.schema}
                      isActive={selected?.path == item.path}
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
