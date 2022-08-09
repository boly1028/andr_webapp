import React from "react";
import { GetStaticProps, NextPage } from "next";

import { Layout } from "@/modules/common";
import {
  FlexBuilderTemplateProps,
  FlexBuilderPage,
} from "@/modules/flex-builder";
import { TEMPLATES } from "../api/flex-builder/constants";

type Props = {
  templateList: Array<FlexBuilderTemplateProps>;
};

const FlexBuilderIndexPage: NextPage<Props> = ({ templateList }) => (
  <Layout>
    <FlexBuilderPage templateList={templateList} />
  </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      templateList: TEMPLATES,
    },
    revalidate: 300,
  };
};

export default FlexBuilderIndexPage;
