import APP_TEMPLATES from "@/lib/schema/templates";
import { ITemplate } from "@/lib/schema/types";
import { AppStoreItemPage } from "@/modules/app-store";
import { Layout } from "@/modules/common";
import { ILinkItemKey } from "@/modules/common/components/sidebar/utils";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface Props {
  template: ITemplate;
}

const Page: NextPage<Props> = ({ template }) => {
  return (
    <Layout activeLink={ILinkItemKey.APP_STORE}>
      <AppStoreItemPage template={template} />
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
  const id = params?.id as string;
  const appTemplate = APP_TEMPLATES.find((t) => t.id === id);
  if (appTemplate) {
    return {
      props: { template: appTemplate },
      revalidate: 300,
    };
  }
  return {
    notFound: true,
  };
};

export default Page;
