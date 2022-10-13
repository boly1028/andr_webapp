import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm, StagingDocumentsModal } from "@/modules/flex-builder";

import { Box, Flex, Text } from "@/theme/ui-elements";
import { FileCheckIcon, Layout, PageHeader } from "@/modules/common";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { cloneDeep } from "lodash";
import { IAdoType, ITemplate } from "@/lib/schema/types";
import { getProxyTemplate } from "@/lib/schema/utils";
import { useExecuteModal } from "@/modules/modals/hooks";
import useConstructProxyMsg from "@/modules/sdk/hooks/useConstructProxyMsg";
import { useGetFunds } from "@/modules/sdk/hooks";

type Props = {
  template: ITemplate;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const router = useRouter();
  const name = router.query.name as string;
  const contract = router.query.contract as string;
  const construct = useConstructProxyMsg();
  const getFunds = useGetFunds();
  const openModal = useExecuteModal(contract);

  const modifiedTemplate: ITemplate = useMemo(() => {
    const newTemplate = cloneDeep(template);
    newTemplate.name = name;
    const formData = newTemplate.formData ?? {};
    formData["proxy-message"] = {
      ...(formData["proxy-message"] ?? {}),
      parent: contract,
      component_name: name,
    };
    newTemplate.formData = formData;
    return newTemplate;
  }, [name, contract]);

  const handleSubmit = async (
    {
      formData,
    }: {
      formData: any;
    },
    simulate = false,
  ) => {
    const msg = construct(formData);
    const funds = getFunds(formData);
    openModal(msg, simulate, funds);
  };

  //TODO: Setup staging availability flags for loading staging sections if passed
  const staging_available = false;

  return (
    <Layout>
      <PageHeader
        title={modifiedTemplate.name}
        desc={modifiedTemplate.description}
      />

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
          // ID is required to refresh the component after we modify the template. If not provided,
          // form will not populate name and address field on direct visit to the page
          key={modifiedTemplate.name}
          template={modifiedTemplate}
          onSubmit={handleSubmit}
          onEstimate={(data: any) => handleSubmit(data, true)}
        />
      </Box>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const { params } = ctx;
  const path = params?.path as string[];
  const data = await getProxyTemplate(path.join("/"));
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { template: JSON.parse(JSON.stringify(data)) },
    revalidate: 300,
  };
};

export default TemplatePage;
