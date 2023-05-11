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
import { useWallet } from "@/lib/wallet";
import { useApolloClient } from "@apollo/client";
import { RefreshCw } from "lucide-react";

const AssetsPage = () => {
  /**Check If wallet is connected, If yes then user is logged in */
  const wallet = useWallet();
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
            variant="outline"
            size="sm"
            mt='auto'
            ml="auto"
            alignSelf="center"
            leftIcon={(<Icon as={RefreshCw} boxSize='4' />)}
            isLoading={loading}
            onClick={() => {
              setLoading(true);
              apolloClient
                .refetchQueries({
                  include: ["QUERY_APP", "QUERY_ASSETS"],
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
      {!wallet && (
        <Center w="full" p="6" mt="10">
          <Box borderColor='dark.300' borderWidth='1px' rounded="3xl" px="6" py="10">
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
