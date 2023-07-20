import { Layout } from "@/modules/common";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";
import { EmbeddablePage } from "@/modules/embeddables";
import type { NextPage } from "next";

const EmbeddablesPage: NextPage = () => {
  return (
    <Layout activeLink={ILinkItemKey.EMBEDDABLES}>
      <EmbeddablePage />
    </Layout>
  );
};

export default EmbeddablesPage;
