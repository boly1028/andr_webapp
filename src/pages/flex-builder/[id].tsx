import { Box, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import absoluteUrl from "next-absolute-url";

import { useCodeId } from "@/lib/andrjs";
import { FileCheckIcon, Layout, PageHeader } from "@/modules/common";
import {
  FlexBuilderForm,
  FlexBuilderTemplateProps,
  StagingDocumentsModal,
} from "@/modules/flex-builder";
import { useInstantiateModal } from "@/modules/modals/hooks";
import { Msg } from "@andromedaprotocol/andromeda.js";
import { useConstructMsg } from "@/modules/sdk/hooks";

type Props = {
  template: FlexBuilderTemplateProps;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const codeId = useCodeId(template.id);
  const construct = useConstructMsg();
  const openModal = useInstantiateModal(codeId);
  const handleSubmit = async ({ formData }: { formData: Msg }) => {
    if (codeId === -1) {
      console.warn("Code ID not fetched");
      return;
    }
    const msg = construct(formData);
    openModal(msg);
  };

  //TODO: Setup staging availability flags for loading staging sections if passed
  const staging_available = false;

  return (
    <Layout>
      <PageHeader title={template.name} desc={template.description} />

      <Box mt={10}>
        {/* Staging section to be shown when declared */}
        {/* ToDO: Modularize as component? */}
        {staging_available && (
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
        )}
        {/* end of toggleable staging section */}
        <FlexBuilderForm template={template} onSubmit={handleSubmit} />
      </Box>
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
