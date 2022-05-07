import React from "react";
import {
  Modal,
  ModalOverlay,
  Text,
  Box,
  ModalContent,
  Flex,
  ModalBody,
  IconButton,
  Link,
  Button,
  HStack,
  useDisclosure,
  Circle,
  VStack,
  type BoxProps,
  Center,
} from "@chakra-ui/react";

import {
  ScanIcon,
  LayoutListIcon,
  UploadCloudIcon,
  DownloadIcon,
  FilePlusIcon,
} from "@/modules/common";

type TemplateItem = {
  id: number;
  icon: React.ReactElement;
  name: string;
  color: string;
  desc: string;
};

type TemplateItemProps = {
  data: TemplateItem;
} & BoxProps;

function TemplateItem({ data, ...props }: TemplateItemProps) {
  const { name, icon, color = "ado", desc } = data;

  const newIcon = React.cloneElement(icon, {
    color: "white",
    boxSize: 5,
  });

  return (
    <Box
      p={4}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
      {...props}
    >
      <Flex>
        <HStack spacing={5} w="full" align="flex-start">
          <Flex
            justify="center"
            align="center"
            borderRadius="lg"
            bg={`${color}.500`}
            p={1.5}
          >
            {newIcon}
          </Flex>
          <Box>
            <Text fontSize="sm" color="gray.700" fontWeight={600} mb={1}>
              {name}
            </Text>
            <Text textStyle="light">{desc}</Text>
          </Box>
        </HStack>
        <Box>
          <IconButton
            as={Link}
            aria-label="Download Templace"
            variant="outline"
            icon={<DownloadIcon boxSize={5} color="gray.500" />}
          />
        </Box>
      </Flex>
    </Box>
  );
}

// Mock data
const ITEMS = [
  {
    id: 1,
    icon: <FilePlusIcon />,
    color: "ado",
    name: "Mint NFT Collectible",
    desc: "Assign a percentage to certain recipients.",
  },
  {
    id: 2,
    icon: <ScanIcon />,
    color: "ado",
    name: "Splitter",
    desc: "Publish multiple fund distribution splitters.",
  },
  {
    id: 3,
    icon: <LayoutListIcon />,
    color: "ado",
    name: "Create Address List",
    desc: "Create a new address list and populate it with your data.",
  },
  {
    id: 4,
    icon: <LayoutListIcon />,
    color: "classifier",
    name: "Add Addresses",
    desc: "Add addresses to a pre-existing address list.",
  },
  {
    id: 4,
    icon: <LayoutListIcon />,
    color: "classifier",
    name: "Remove Addresses",
    desc: "Remove addresses from a pre-existing address list.",
  },
];

function StagingDocumentsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="primary" onClick={onOpen}>
        View Staging
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="634px">
          <ModalBody>
            <Text fontWeight={600} mb={3} color="gray.700">
              Load Staging Document
            </Text>
            <Text textStyle="light" mb={7}>
              Upload your staging documents to auto-fill the related forms. You
              will be presented with a proofing page which allows you to confirm
              what the actions being loaded entail.
            </Text>

            <VStack
              border="1px solid"
              borderColor="gray.300"
              borderRadius="lg"
              spacing={2}
              p={4}
              mb={7}
            >
              <Circle bg="gray.100" p={2.5}>
                <UploadCloudIcon boxSize={5} />
              </Circle>
              <VStack spacing={1}>
                <Text color="gray.500" fontSize="sm">
                  <Text as="span" color="primary.700" fontWeight={500}>
                    Click to upload
                  </Text>{" "}
                  or drag and drop
                </Text>
                <Text fontSize="xs" color="gray.500">
                  CSV format
                </Text>
              </VStack>
            </VStack>

            <Text fontWeight={600} mb={3} color="gray.700">
              Download Staging Document
            </Text>
            <Text textStyle="light" mb={7}>
              Staging documents are CSV files you can load with a ll the
              information you need toprocess so it can be submitted at one time.
            </Text>

            <TemplateItem
              data={{
                id: 1,
                color: "ado",
                icon: <FilePlusIcon />,
                name: "NFT Collectible",
                desc: "Publish multiple new NFT Collectible with its related metadata.",
              }}
            />

            <Text fontWeight={600} mt={7} mb={3} color="gray.700">
              Other Staging Documents Available
            </Text>
            <Text textStyle="light" mb={7}>
              We offer staging options for a variety of other processes. If you
              perform these actions regularly, then you may be interested in
              reviewing our other staging options.
            </Text>

            <Box
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.300"
              overflow="hidden"
            >
              {ITEMS.map((item) => {
                return (
                  <TemplateItem
                    key={item.id}
                    data={item}
                    border={0}
                    borderRadius={0}
                    borderBottom="1px solid"
                    borderBottomColor="gray.300"
                    _last={{ border: 0 }}
                  />
                );
              })}
            </Box>
            <Center mt={6}>
              <Link fontSize="sm" color="primary.600">
                View All Available Staging Documents
              </Link>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default StagingDocumentsModal;
