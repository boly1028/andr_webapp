import React from "react";
import { NextPage } from "next";
import absoluteUrl from "next-absolute-url";

import { Layout } from "@/modules/common";
import {
  FlexBuilderTemplateProps,
  FlexBuilderPage,
} from "@/modules/flex-builder";

type Props = {
  templateList: Array<FlexBuilderTemplateProps>;
};

const Index: NextPage<Props> = ({ templateList }) => (
  <Layout>
    <FlexBuilderPage templateList={templateList} />
  </Layout>
);

Index.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/flex-builder`);
  const json = await res.json();
  return { templateList: json };
};

export default Index;
