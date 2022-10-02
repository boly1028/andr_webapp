import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm, StagingDocumentsModal } from "@/modules/flex-builder";

import { Box, Flex, Text } from "@/theme/ui-elements";
import { FileCheckIcon, Layout, PageHeader } from "@/modules/common";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { cloneDeep } from "lodash";
import { ITemplate } from "@/lib/schema/types";
import { getAppExecuteTemplate } from "@/lib/schema/utils";
import { constructMsg } from "@/modules/sdk/utils";
import { useExecuteModal } from "@/modules/modals/hooks";

type Props = {
  template: ITemplate;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const router = useRouter();
  const name = router.query.name as string;
  const contract = router.query.contract as string;
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

  const handleSubmit = async ({ formData }: any) => {
    const _formData = cloneDeep(formData);
    // Do not send proxy message as part of constuct msg as it is only needed for us
    // to know address and name
    delete _formData["proxy-message"];
    const msg = constructMsg(_formData);
    console.log("Execute Message Dataset:", _formData);
    console.log("Encoded Sample Message:", msg);

    openModal(msg);
    // const resp = await instantiate(formData, `Instantiate ${template.id}`);
    // window.open(
    //   `https://testnet.mintscan.io/juno-testnet/txs/${resp.transactionHash}`,
    // );
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
  const data = await getAppExecuteTemplate(path.join("/"));
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
