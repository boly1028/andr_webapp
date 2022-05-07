import { useState } from "react";
import absoluteUrl from "next-absolute-url";
import { NextPage } from "next";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useLCDClient } from "@terra-money/wallet-provider";
import { useTx, useAddress, estimateFee } from "@arthuryeti/terra";

import { Layout, PageHeader, TxStep, FileCheckIcon } from "@/modules/common";
import {
  createBuilderMsgs,
  FlexBuilderForm,
  FlexBuilderTemplateProps,
  StagingDocumentsModal,
} from "@/modules/flex-builder";
import { TransactionModal } from "@/modules/modals";

type Props = {
  template: FlexBuilderTemplateProps;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [txStep, setTxStep] = useState<TxStep>("IDLE");
  const [txHash, setTxHash] = useState<string | null>(null);
  const client = useLCDClient();
  const address = useAddress();

  const { submit } = useTx({
    onBroadcasting: (txHash) => {
      setTxHash(txHash);
      setTxStep("BROADCASTING");
    },
  });

  const handleSubmit = async ({ formData }: any) => {
    if (client == null || formData == null || address == null) {
      return;
    }

    setTxStep("POSTING");
    setIsOpen(true);

    const msgs = createBuilderMsgs({ data: formData }, address);

    if (msgs == null) {
      return;
    }

    const fee = await estimateFee({
      client,
      address,
      // @ts-expect-error - TODO
      msgs,
      opts: {},
    });

    submit({
      // @ts-expect-error - TODO
      msgs,
      fee,
    });
  };

  return (
    <Layout>
      <PageHeader title={template.name} desc={template.description} />

      <Box mt={10}>
        <Flex
          align="center"
          border="1px solid"
          borderColor="primary.300"
          borderRadius="lg"
          bg="primary.25"
          mb={4}
          p={3}
        >
          <Box mr={4}>
            <Flex
              justify="center"
              align="center"
              bg="primary.100"
              color="primary.700"
              borderRadius="full"
              p={3}
            >
              <FileCheckIcon boxSize={6} />
            </Flex>
          </Box>
          <Box flex={1}>
            <Text color="primary.700" fontWeight={500}>
              Staging Available
            </Text>
            <Text color="primary.600" fontSize="sm">
              Need to perform this operation multiple times? Staging documents
              are available.
            </Text>
          </Box>
          <StagingDocumentsModal />
        </Flex>
        <FlexBuilderForm template={template} onSubmit={handleSubmit} />
      </Box>

      <TransactionModal
        isOpen={isOpen}
        txStep={txStep}
        txHash={txHash}
        onTxStepChange={setTxStep}
        onClose={() => setIsOpen(false)}
      />
    </Layout>
  );
};

TemplatePage.getInitialProps = async ({ req, query }) => {
  const { origin } = absoluteUrl(req);
  const { id } = query;

  const res = await fetch(`${origin}/api/flex-builder/${id}`);
  const json = await res.json();
  return { template: json };
};

export default TemplatePage;
