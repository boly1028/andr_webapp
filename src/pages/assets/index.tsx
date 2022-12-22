import React from "react";

import { Layout } from "@/modules/common";
import { AssetsPage } from "@/modules/assets";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";

export default function Assets() {
  return (
    <Layout activeLink={ILinkItemKey.ASSETS}>
      <AssetsPage />
    </Layout>
  );
}
