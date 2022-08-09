import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import absoluteUrl from "next-absolute-url";

import { useCodeId } from "@/lib/andrjs";
// import usePublishContract from "@/modules/sdk/hooks/usePublishContract";
import { constructMsgSample } from "@/modules/sdk/hooks";
// import { useModifyContract } from "@/modules/sdk/hooks";

import {
  FlexBuilderForm,
  FlexBuilderTemplateProps,
  StagingDocumentsModal,
} from "@/modules/flex-builder";

import { Box, Flex, Text } from "@/theme/ui-elements";
import { FileCheckIcon, Layout, PageHeader } from "@/modules/common";
import { getFlexecuteTemplateFromPath } from "../api/flexecute/search";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { cloneDeep } from "lodash";

type Props = {
  template: FlexBuilderTemplateProps;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const codeId = useCodeId(template.id);
  /* alteration to integrating msg delivery to AndroemdaJS will be referenced by a useModifyContract() function call
  // Parameters are anticipated to be contract, msg, coin value
  const instantiate = useModifyContract(codeId);
  */

  const router = useRouter();

  const modifiedTemplate: FlexBuilderTemplateProps = useMemo(() => {
    const name = router.query.name as string;
    const contract = router.query.contract as string;
    const newTemplate = cloneDeep(template);
    newTemplate.name = name;
    newTemplate.formData["proxy-message"] = {
      ...(newTemplate.formData["proxy-message"] ?? {}),
      parent: contract,
      component_name: name,
    };
    return newTemplate;
  }, [router]);

  const handleSubmit = async ({ formData }: any) => {
    console.log("Encoded Sample Message:", constructMsgSample(formData));
    console.log("Execute Message Dataset:", formData);

    // if (codeId === -1) {
    //   console.warn("Code ID not fetched");
    //   return;
    // }
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
        <FlexBuilderForm template={modifiedTemplate} onSubmit={handleSubmit} />
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
  const data = await getFlexecuteTemplateFromPath(path.join("/"));
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
