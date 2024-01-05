import { useQueryChainConfig } from "@/lib/graphql/hooks/chain/useChainConfig";
import { useQueryBaseAdo } from "@/lib/graphql/hooks/useQueryBaseAdo";
import { CopyButton, FallbackPlaceholder, truncate } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { useAndromedaStore } from "@/zustand/andromeda";
import { Box, Center, Icon, IconButton, Skeleton, Stack, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";
import { ExternalLinkIcon } from "lucide-react";
import React, { FC } from "react"

interface Props {
    address: string
}

const Info: FC<Props> = (props) => {
    const { address } = props;
    const { data: baseAdo, loading, error } = useQueryBaseAdo(address);
    const chainId = useAndromedaStore(state => state.chainId);
    const { data: currentConfig } = useQueryChainConfig(chainId);
    return (
        <Box
            p="2"
            rounded="xl"
            border="1px"
            borderColor="border.main"
        >
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
                <TableContainer
                >
                    <Table variant="simple" fontSize="sm">
                        <Tbody>
                            <Tr>
                                <Td fontWeight="light">Type</Td>
                                <Td>
                                    <CopyButton
                                        size='sm'
                                        variant="theme-ghost"
                                        text={`${baseAdo.andr.type}@${baseAdo.andr.version}`}
                                    >
                                        {baseAdo.andr.type}@{baseAdo.andr.version}
                                    </CopyButton>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="light">Block Height</Td>
                                <Td>
                                    <CopyButton
                                        size='sm'
                                        variant="theme-ghost"
                                        text={baseAdo.andr.blockHeightUponCreation?.toString() ?? ''}
                                    >
                                        {baseAdo.andr.blockHeightUponCreation}
                                    </CopyButton>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="light">Contract Address</Td>
                                <Td>
                                    <CopyButton
                                        size='sm'
                                        variant="theme-ghost"
                                        text={baseAdo.andr.address ?? ''}
                                    >
                                        {truncate(baseAdo.andr.address)}
                                    </CopyButton>
                                    <IconButton
                                        aria-label="contract-address-explorer"
                                        as="a"
                                        href={currentConfig ? SITE_LINKS.blockExplorerAccount(currentConfig, baseAdo.andr.address) : ''}
                                        target="_blank"
                                        icon={<Icon as={ExternalLinkIcon} />}
                                        variant="theme-ghost"
                                        size='sm'
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="light">
                                    Owner
                                </Td>
                                <Td>
                                    <CopyButton
                                        size='sm'
                                        variant="theme-ghost"
                                        text={baseAdo.andr.owner ?? ''}
                                    >
                                        {truncate(baseAdo.andr.owner)}
                                    </CopyButton>
                                    <IconButton
                                        aria-label="owner-explorer"
                                        as="a"
                                        href={currentConfig ? SITE_LINKS.blockExplorerAccount(currentConfig, baseAdo.andr.owner) : ''}
                                        target="_blank"
                                        icon={<Icon as={ExternalLinkIcon} />}
                                        variant="theme-ghost"
                                        size='sm'
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td borderBottom={0} fontWeight="light">
                                    Original Publisher
                                </Td>
                                <Td borderBottom={0}>
                                    <CopyButton
                                        size='sm'
                                        variant="theme-ghost"
                                        text={baseAdo.andr.originalPublisher ?? ''}
                                    >
                                        {truncate(baseAdo.andr.originalPublisher)}
                                    </CopyButton>
                                    <IconButton
                                        aria-label="original-publisher-explorer"
                                        as="a"
                                        href={currentConfig ? SITE_LINKS.blockExplorerAccount(currentConfig, baseAdo.andr.originalPublisher) : ''}
                                        target="_blank"
                                        icon={<Icon as={ExternalLinkIcon} />}
                                        variant="theme-ghost"
                                        size='sm'
                                    />
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    )
}

export default Info