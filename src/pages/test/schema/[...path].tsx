import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FlexBuilderForm } from "@/modules/flex-builder";

import { Box } from "@/theme/ui-elements";
import { Layout, PageHeader } from "@/modules/common";
import { useRouter } from "next/router";
import { ITemplate } from "@/lib/schema/types";
import { getADOExecuteTemplate } from "@/lib/schema/utils";
import { useAndromedaClient } from "@/lib/andrjs";

type Props = {
  template: ITemplate;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  const router = useRouter();
  const contract = router.query.contract as string;
  const client = useAndromedaClient();

  const handleSubmit = async (
    {
      formData,
    }: {
      formData: any;
    }) => {
    console.log("FORM::DATA", formData)
    // const msg = construct(formData);
    // const funds = getFunds(formData);
    // openModal(msg, simulate, funds);
  };

  //TODO: Setup staging availability flags for loading staging sections if passed
  const staging_available = false;

  return (
    <Layout>
      <PageHeader title={`Execute message`} desc={`App address ${contract}`} />

      <Box mt={10}>
        <FlexBuilderForm
          // ID is required to refresh the component after we modify the template. If not provided,
          // form will not populate name and address field on direct visit to the page
          key={template.name}
          template={template}
          onSubmit={handleSubmit}
          notReady={!client?.isConnected}
          onCliCopy={() => ``}
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
  const data = await getADOExecuteTemplate(path.join("/"));
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
