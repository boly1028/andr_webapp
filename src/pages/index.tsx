import React from "react";
import { NextPage } from "next";
import absoluteUrl from "next-absolute-url";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder";
import { BuilderPage } from "@/modules/pages";

type Props = {
  templateList: Array<FlexBuilderTemplateProps>;
};

const Index: NextPage<Props> = ({ templateList }) => (
  <BuilderPage templateList={templateList} />
);

Index.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/flex-builder`);
  const json = await res.json();
  return { templateList: json };
};

export default Index;
