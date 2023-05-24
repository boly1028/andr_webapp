import { Box } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { INSTANTIATE_CLI_QUERY, useCodeId } from "@/lib/andrjs";
import { Layout, PageHeader } from "@/modules/common";
import { FlexBuilderForm } from "@/modules/flex-builder";
import { useInstantiateModal } from "@/modules/modals/hooks";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { ITemplate } from "@/lib/schema/types";
import { getAppTemplateById } from "@/lib/schema/utils";
import { useWallet } from "@/lib/wallet";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";
import { FlexBuilderFormProps } from "@/modules/flex-builder/components/FlexBuilderForm";
import { useCallback, useEffect, useState } from "react";
import { useGetFlexFileFromUrl } from "@/modules/flex-builder/hooks/useFlexFile";

type Props = {
  template: ITemplate;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const codeId = useCodeId(template.adoType);
  const account = useWallet();

  const construct = useConstructAppMsg();
  const openModal = useInstantiateModal(codeId);

  const getMsg = (formData: any) => {
    console.log(formData);
    const msg = construct(formData);
    return msg;
  }

  const handleSubmit = async ({ formData }) => {
    if (codeId === -1) {
      console.warn("Code ID not fetched");
      return;
    }
    const msg = getMsg(formData);
    openModal(msg);
  };

  const handleCliCopy: FlexBuilderFormProps['onCliCopy'] = useCallback((formData) => {
    if (codeId === -1) {
      console.warn("Code ID not fetched");
      return '';
    }
    const msg = getMsg(formData);
    const query = INSTANTIATE_CLI_QUERY({
      msg,
      codeId: codeId
    })
    console.log(query)
    return query
  }, [codeId, getMsg])


  return (
    <Layout activeLink={ILinkItemKey.ADO_BUILDER}>
      <PageHeader title={template.name} desc={template.description} />
      <Box mt={10}>
        <FlexBuilderForm
          template={template}
          onSubmit={handleSubmit}
          notReady={!codeId || codeId === -1 || !account}
          addButtonTitle="Add App Component"
          onCliCopy={handleCliCopy}
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
