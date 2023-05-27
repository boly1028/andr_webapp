import { useChainConfig } from "@/lib/andrjs";
import { useWalletContext } from "@/lib/wallet";
import {
  CopyButton,
  CopyIcon,
  FallbackPlaceholder,
  truncate,
} from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
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
  Center,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { useGlobalModalContext } from "../hooks";
import { AssetInfoModalProps } from "../types";
import { useQueryBaseAdo } from "@/lib/graphql/hooks/useQueryBaseAdo";
import { useQueryTxByAddress } from "@/lib/graphql";

const AssetInfoModal: FC<AssetInfoModalProps> = memo(function AssetInfoModal({
  address,
  adoType
}) {
  const { close } = useGlobalModalContext();
  const { data: baseAdo, loading, error } = useQueryBaseAdo(address);
  const { chainId } = useWalletContext();
  const { data: txs } = useQueryTxByAddress(address, chainId);
  const { data: currentConfig } = useChainConfig(chainId);

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
      {error && (
        <Center mt='6'>
          <FallbackPlaceholder
            title="ERROR!"
            desc={`Something went wrong, we were not able to fetch data properly`}
          ></FallbackPlaceholder>
        </Center>
      )}
      {loading && (
        <Stack mt='6'>
          <Skeleton h="14" rounded="xl" />
          <Skeleton h="14" rounded="xl" />
          <Skeleton h="14" rounded="xl" />
        </Stack>
      )}
      {baseAdo && (
        <>
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
                  <Td>{baseAdo.andr.type}@{baseAdo.andr.version}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="light">Block Height</Td>
                  <Td>
                    {baseAdo.andr.blockHeightUponCreation}
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="light">Contract Address</Td>
                  <Td>
                    <CopyButton
                      variant="link"
                      colorScheme="gray"
                      gap="2"
                      text={baseAdo.andr.address ?? ''}
                    >
                      {truncate(baseAdo.andr.address)}
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
                      text={baseAdo.andr.owner ?? ''}
                    >
                      {truncate(baseAdo.andr.owner)}
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
                      text={baseAdo.andr.originalPublisher ?? ''}
                    >
                      {truncate(baseAdo.andr.originalPublisher)}
                      <CopyIcon boxSize="4" />
                    </CopyButton>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Text mt='6'>Transactions</Text>
          <Box
            p="4"
            rounded="xl"
            border="1px"
            borderColor="dark.300"
            mt="2"
            maxH='24'
            overflow='auto'
          >
            <VStack gap='4' alignItems='start' fontSize='sm' fontWeight='light'>
              {txs?.map(tx => (
                <Flex key={tx.hash} flexDirection='row' gap={2} w='full'>
                  <CopyButton
                    variant="link"
                    colorScheme="gray"
                    gap="2"
                    text={tx.hash}
                  >
                    {truncate(tx.hash, [12, 10])}
                    <CopyIcon boxSize="4" />
                  </CopyButton>
                  <ExternalLink label={''} href={currentConfig ? SITE_LINKS.blockExplorerTx(currentConfig, tx.hash) : ''} />
                  <Text fontSize='xs' color='dark.500' ml='auto'>Block Height: {tx.height}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </>
      )}
      <Flex justify="end" mt="6">
        <Button variant="solid" onClick={close} colorScheme="primary">
          Dismiss
        </Button>
      </Flex>
    </Box>
  );
});

export default AssetInfoModal;
