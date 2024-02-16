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
    Icon,
    IconButton,
    Skeleton,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Table,
    TableContainer,
    Tabs,
    Tbody,
    Td,
    Tr,
} from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { useGlobalModalContext } from "../../hooks";
import { AssetInfoModalProps } from "../../types";
import { useQueryBaseAdo } from "@/lib/graphql/hooks/useQueryBaseAdo";
import { useQueryTxByAddress } from "@/lib/graphql";
import { useQueryChainConfig } from "@/lib/graphql/hooks/chain/useChainConfig";
import { useAndromedaStore } from "@/zustand/andromeda";
import Info from "./Info";
import Transactions from "./Transactions";

const AssetInfoModal: FC<AssetInfoModalProps> = memo(function AssetInfoModal({
    address,
}) {
    const { close } = useGlobalModalContext();

    return (
        <Box>
            <Tabs>
                <TabList>
                    <Tab>
                        Info
                    </Tab>
                    <Tab>
                        Transactions
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Info address={address} />
                    </TabPanel>
                    <TabPanel>
                        <Transactions address={address} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            < Flex justify="end" mt="6" >
                <Button variant="solid" onClick={close} colorScheme="primary">
                    Dismiss
                </Button>
            </Flex >
        </Box >
    );
});

export default AssetInfoModal;
