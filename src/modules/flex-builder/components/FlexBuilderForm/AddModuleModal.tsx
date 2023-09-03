import React, { useState, useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import { Link, ModalCloseButton, ModalFooter, ModalHeader, useDisclosure } from "@chakra-ui/react";

import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
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
import { SearchBar } from "@/modules/common";

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
  console.log(data.schema.class)

  return (
    <Box
      textAlign="left"
      p={4}
      border={`${isActive ? "2px" : "1px"} solid`}
      borderColor={isActive ? `category.${data?.schema?.class.toLowerCase()}` : "border.main"}
      borderRadius="lg"
      transition="all"
      transitionDuration="150ms"
      transform="auto"
      _hover={{ scale: "102%" }}
      onClick={onClick}
      cursor='pointer'
    >
      <Flex>
        <Box mr={4} mt='0.5'>
          <ClassifierIcon adoType={data.schema.$id} boxSize={4} w='7' h='7'/>
        </Box>
        <Box flex={1}>
          <Text textStyle="main-md-semibold" color="content.high">{data?.schema?.title}</Text>
          <Text maxW='xs' color='content.medium' textStyle="main-xs-regular">{data?.schema?.description}</Text>
          <Link
            href={SITE_LINKS.documentation(data?.schema?.$id)}
            target="_blank"
            referrerPolicy="no-referrer"
            color='primary.500'
            textStyle="main-xs-medium"
            display="flex"
            alignItems="center"
            gap="1"
            flexDirection="row"
            w="min-content"
          >
            Documentation
            <ExternalLink width={14} />
          </Link>
        </Box>
        <Flex direction="column" gap={0} align="end">
          {/* Use lodash to capitalize first letter of class */}
          <Text textStyle="main-sm-regular">{_.upperFirst(data?.schema?.class)}</Text>
          <Text textStyle="main-xs-regular" color='content.low'>
            {data?.schema?.$id ?? ""}@{data?.schema?.version ?? "0.0.0"}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

interface AddModuleModalProps {
  items: NonNullable<ITemplate["modules"]>;
  onAdd: (item: IAndromedaSchemaJSON) => void;
  title?: string
}

// TODO: This modal need an API to get the list of ADOs and to add a module
function AddModuleModal({ onAdd, items, title = 'Add Component' }: AddModuleModalProps) {
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
        onClick={onOpen}
        leftIcon={<Icon as={PlusIcon} boxSize={5} />}
        variant="theme-filled"
        w='full'
        py='6'
      >
        {title}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="container.sm">
          <ModalHeader>
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={0} pb={0}>
            {/* Sorting and Filtering Controls */}
            <HStack mb={4} spacing={4} pl={6} pr={7}>
              {/* Text Filtering */}
              <SearchBar
                id="search-text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="By title or description"
                variant='outline'
              />
              {/* Class Selection Filter */}
              <Select
                id="class-selector"
                flex={0}
                minW="max-content"
                fontSize="sm"
                value={classText}
                onChange={(e) => setClassText(e.target.value)}
              >
                <option value="all">Show All Components</option>
                <option value="baseADO">Base ADO</option>
                <option value="primitive">Primitive</option>
                <option value="module">Module</option>
              </Select>
            </HStack>

            <Box maxH="375px" overflowX="auto" px={6} pb={6}>
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
            // boxShadow="0px -1px 20px rgba(10, 10, 31, 0.2);"
            >
              <Box textAlign="right">
                {/* <Text textStyle="light">Estimated Fee</Text>
                <Text textStyle="light" color="module.600">
                  0.15 UST
                </Text> */}
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={!selected}
              onClick={handleAdd}
              leftIcon={<Icon as={PlusIcon} boxSize={5} />}
              variant='theme-low'
              size='sm'
            >
              {title}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddModuleModal;
