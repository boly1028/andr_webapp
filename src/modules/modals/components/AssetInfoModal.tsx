import useQueryAndrQuery from "@/lib/graphql/hooks/useQueryAndrQuery";
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
import { FC, memo, useCallback } from "react";
import { useGlobalModalContext } from "../hooks";
import { AssetInfoModalProps } from "../types";

const AssetInfoModal: FC<AssetInfoModalProps> = memo(function AssetInfoModal({
  address,
  adoType
}) {
  const { close } = useGlobalModalContext();
  const { data: andrResult, loading, error } = useQueryAndrQuery(adoType, address);

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
        <Box mr="4">
          <ClassifierIcon adoType="app" boxSize={6} />
        </Box>
        <VStack align="start">
          <Text fontWeight="bold">{"ADO Info"}</Text>
        </VStack>
      </Flex>
      <TableContainer
        p="2"
        rounded="xl"
        border="1px"
        borderColor="dark.300"
        mt="6"
      >
        <Table variant="simple" fontSize="sm">
          <Tbody>
            <Tr>
              <Td fontWeight="light">Type</Td>
              <Td>{andrResult?.type}@{andrResult?.version}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="light">Block Height</Td>
              <Td>{andrResult?.blockHeightUponCreation}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="light">Contract Address</Td>
              <Td>
                <CopyButton
                  variant="link"
                  colorScheme="gray"
                  gap="2"
                  text={andrResult?.address ?? ''}
                >
                  {truncate(andrResult?.address)}
                  <CopyIcon boxSize="4" />
                </CopyButton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="light">
                Owner
              </Td>
              <Td>
                <CopyButton
                  variant="link"
                  colorScheme="gray"
                  gap="2"
                  text={andrResult?.owner ?? ''}
                >
                  {truncate(andrResult?.owner)}
                  <CopyIcon boxSize="4" />
                </CopyButton>
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="light">Creator</Td>
              <Td>
                <CopyButton
                  variant="link"
                  colorScheme="gray"
                  gap="2"
                  text={andrResult?.creator ?? ''}
                >
                  {truncate(andrResult?.creator)}
                  <CopyIcon boxSize="4" />
                </CopyButton>
              </Td>
            </Tr>
            <Tr>
              <Td borderBottom={0} fontWeight="light">
                Original Publisher
              </Td>
              <Td borderBottom={0}>
                <CopyButton
                  variant="link"
                  colorScheme="gray"
                  gap="2"
                  text={andrResult?.originalPublisher ?? ''}
                >
                  {truncate(andrResult?.originalPublisher)}
                  <CopyIcon boxSize="4" />
                </CopyButton>
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
