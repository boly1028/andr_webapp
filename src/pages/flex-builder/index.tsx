import React from "react";
import { GetStaticProps, NextPage } from "next";

import { Layout } from "@/modules/common";
import { FlexBuilderPage } from "@/modules/flex-builder";
import { ITemplate } from "@/lib/schema/types";
import APP_TEMPLATES from "@/lib/schema/templates";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";

type Props = {
  templateList: Array<ITemplate>;
};

const FlexBuilderIndexPage: NextPage<Props> = ({ templateList }) => (
  <Layout activeLink={ILinkItemKey.ADO_BUILDER}>
    <FlexBuilderPage templateList={templateList} />
  </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      templateList: APP_TEMPLATES.filter((t) => t.starter),
    },
    revalidate: 300,
  };
};

export default FlexBuilderIndexPage;
