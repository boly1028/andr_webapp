import React, { useState } from "react";

import { AdosList } from "@/modules/assets";
import { PageHeader, Wallet, FallbackPlaceholder } from "@/modules/common";

import {
  Box,
  Center,
  Button,
  Icon,
  Divider,
} from "@/theme/ui-elements";
import { useApolloClient } from "@apollo/client";
import { RefreshCw } from "lucide-react";
import { useAccount } from "@/lib/andrjs/hooks/useAccount";

const AssetsPage = () => {
  /**Check If wallet is connected, If yes then user is logged in */
  const wallet = useAccount();
  const [loading, setLoading] = useState(false);
  const apolloClient = useApolloClient();

  return (
    <Box>
      <PageHeader
        title="Assets"
        desc="Locate and Interact with your ADOs and Apps"
        rightElement={(
          <Button
            display={!wallet ? 'none' : 'flex'}
            variant="theme-filled"
            size="sm"
            mt='auto'
            ml="auto"
            alignSelf="center"
            leftIcon={(<Icon as={RefreshCw} boxSize='4' />)}
            isLoading={loading}
            onClick={() => {
              setLoading(true);
              apolloClient.refetchQueries({
                updateCache(cache) {
                  cache.evict({ fieldName: "ADO" });
                  cache.evict({ fieldName: "tx" });
                  cache.evict({ fieldName: "assets" });
                },
              })
                .catch((err) => {
                  console.log(err);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            Refresh
          </Button>
        )}
      />
      <Divider my='6' />
      {!wallet?.address && (
        <Center w="full" p="6" mt="10">
          <Box borderColor='border.main' borderWidth='1px' rounded="3xl" px="6" py="10">
            <FallbackPlaceholder
              title="You are not logged in."
              desc=""
            >
              <Wallet />
            </FallbackPlaceholder>
          </Box>
        </Center>
      )}
      {wallet && (
        <Box mb={5}>
          <AdosList />
        </Box>
      )}
    </Box>
  );
};

export default AssetsPage;
