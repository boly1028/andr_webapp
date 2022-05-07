import { useState } from "react";
import absoluteUrl from "next-absolute-url";
import { NextPage } from "next";
import { JSONSchema7 } from "json-schema";
import {
  Box,
  Circle,
  Text,
  Icon,
  useColorModeValue,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useLCDClient } from "@terra-money/wallet-provider";
import { estimateFee, useTx, useAddress } from "@arthuryeti/terra";
import { Image as ImageIcon } from "lucide-react";

import { Layout, TxStep } from "@/modules/common";
import {
  createBuilderMsgs,
  FlexBuilderForm,
  FlexBuilderTemplateProps,
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

    console.log("formData", formData);
    return;

    /** 
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
    });*/
  };

  return (
    <Layout>
      <Box>
        <HStack spacing={4}>
          <Circle size="36px" bg="purple.600" color="white">
            <Icon as={ImageIcon} color="white" />
          </Circle>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"xl"}
            fontFamily={"body"}
            fontWeight={600}
          >
            {template.name}
          </Heading>
        </HStack>
        <Text color={"gray.500"} fontSize="sm" my={4}>
          {template.description}
        </Text>
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
