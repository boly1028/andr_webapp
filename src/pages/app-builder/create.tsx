import React from "react";

import { Layout } from "@/modules/common";
import { AppBuilderCreatePage } from "@/modules/app-builder";

export default function AppBuilderCreate() {
  return (
    <Layout px={0} maxW="100%" ml={0}>
      <AppBuilderCreatePage />
    </Layout>
  );
}
