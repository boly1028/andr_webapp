import useQueryAppInfo from "@/lib/graphql/hooks/useQueryAppInfo";
import {
  CopyButton,
  CopyIcon,
  FallbackPlaceholder,
  truncate,
} from "@/modules/common";
import ClassifierIcon from "@/theme/icons/classifiers";
import {
  Box,
  Text,
  Flex,
  VStack,
  ExternalLink,
  Button,
} from "@/theme/ui-elements";
import {
  Skeleton,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";
import { FC, memo, useCallback, useMemo } from "react";
import { useGlobalModalContext } from "../hooks";
import { AssetInfoModalProps } from "../types";

const AssetInfoModal: FC<AssetInfoModalProps> = memo(function AssetInfoModal({
  address,
}) {
  const { close } = useGlobalModalContext();
  const { data: appInfo, loading, error } = useQueryAppInfo(address);

  const onCallback = useCallback(() => {
    close();
  }, [close]);

  if (error) {
    <Box>
      <FallbackPlaceholder
        title="ERROR!"
        desc="Something went wrong, we were not able to fetch data properly"
      ></FallbackPlaceholder>
    </Box>;
  }

  if (loading) {
    <Stack>
      <Skeleton h="14" rounded="xl" />
      <Skeleton h="14" rounded="xl" />
      <Skeleton h="14" rounded="xl" />
    </Stack>;
  }

  return (
    <Box>
      <Flex align="center" direction="row">
        <Flex
          align="center"
          justify="center"
          w={8}
          h={8}
          borderRadius="lg"
          mr={6}
        >
          <ClassifierIcon schemaClassifier="app" boxSize={6} />
        </Flex>
        <VStack align="start">
          <Text fontWeight="bold">{appInfo?.name ?? "App Info"}</Text>
        </VStack>
      </Flex>
      <TableContainer
        p="2"
        rounded="xl"
        border="1px"
        borderColor="gray.300"
        mt="6"
      >
        <Table variant="simple" fontSize="sm">
          <Tbody>
            <Tr>
              <Td fontWeight="light">Name</Td>
              <Td>{appInfo?.name}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="light">Contract Address</Td>
              <Td>
                <CopyButton
                  variant="link"
                  colorScheme="gray"
                  gap="2"
                  text={appInfo?.contractAddress ?? ""}
                >
                  {truncate(appInfo?.contractAddress)}
                  <CopyIcon boxSize="4" />
                </CopyButton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="light">Owner</Td>
              <Td>
                <CopyButton
                  variant="link"
                  colorScheme="gray"
                  gap="2"
                  text={appInfo?.owner ?? ""}
                >
                  {truncate(appInfo?.owner)}
                  <CopyIcon boxSize="4" />
                </CopyButton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="light">Operators []</Td>
              <Td>
                <ExternalLink href="#" label="l7ramjwzfrvnw0mv25t03x..." />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify="end" mt="6">
        <Button variant="solid" onClick={close} colorScheme="primary">
          Dismiss
        </Button>
      </Flex>
    </Box>
  );
});

export default AssetInfoModal;
