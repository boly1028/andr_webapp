import APP_TEMPLATES from "@/lib/schema/templates";
import { AppStoreItemPage } from "@/modules/app-store";
import { APP_STORE_TEMPLATES } from "@/modules/app-store/constants";
import { IAppItem } from "@/modules/app-store/types";
import { Layout } from "@/modules/common";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface Props {
  app: IAppItem;
}

const Page: NextPage<Props> = ({ app }) => {
  return (
    <Layout>
      <AppStoreItemPage app={app} />
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
  const appTemplate = APP_STORE_TEMPLATES.find((t) => t.id === id);
  if (appTemplate) {
    const data = APP_TEMPLATES.find((t) => t.id === appTemplate.templateId);
    if (data) {
      return {
        props: { app: { ...data, ...appTemplate } },
        revalidate: 300,
      };
    }
  }
  return {
    notFound: true,
  };
};

export default Page;
