import React from "react";
import { GetStaticProps, NextPage } from "next";

import { Layout } from "@/modules/common";
import { FlexBuilderPage } from "@/modules/flex-builder";
import { ITemplate } from "@/lib/schema/types";
import APP_TEMPLATES from "@/lib/schema/templates";

type Props = {
  templateList: Array<ITemplate>;
};

const FlexBuilderIndexPage: NextPage<Props> = ({ templateList }) => (
  <Layout>
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
