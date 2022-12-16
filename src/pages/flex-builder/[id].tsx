import { Box, Flex, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useCodeId } from "@/lib/andrjs";
import { FileCheckIcon, Layout, PageHeader } from "@/modules/common";
import { FlexBuilderForm, StagingDocumentsModal } from "@/modules/flex-builder";
import { useInstantiateModal } from "@/modules/modals/hooks";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { ITemplate } from "@/lib/schema/types";
import { getAppTemplateById } from "@/lib/schema/utils";
import { useWallet } from "@/lib/wallet";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";

type Props = {
  template: ITemplate;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const codeId = useCodeId(template.adoType);
  const account = useWallet();

  const construct = useConstructAppMsg();
  const openModal = useInstantiateModal(codeId);
  const handleSubmit = async (data, simulate = false) => {
    if (codeId === -1) {
      console.warn("Code ID not fetched");
      return;
    }
    const { formData } = data;
    console.log(formData);
    const msg = construct(formData);
    openModal(msg, simulate);
  };

  //TODO: Setup staging availability flags for loading staging sections if passed
  const staging_available = false;

  return (
    <Layout activeLink={ILinkItemKey.ADO_BUILDER}>
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
        <FlexBuilderForm
          template={template}
          onSubmit={handleSubmit}
          notReady={!codeId || codeId === -1 || !account}
        />
      </Box>
    </Layout>
  );
};

// DIRECTLY CALLING DATABASE FUNCTION IS FASTER THAN CALLING THROUGH API ENDPOINTZ

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const { params } = ctx;
  const id = params?.id as string;
  const data = await getAppTemplateById(id);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { template: data },
    revalidate: 300,
  };
};

export default TemplatePage;
