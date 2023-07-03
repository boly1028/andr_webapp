import { Layout } from "@/modules/common";
import { EmbeddablePage } from "@/modules/embeddables";
import type { NextPage } from "next";

const EmbeddablesPage: NextPage = () => {
  return (
    <Layout>
      <EmbeddablePage />
    </Layout>
  );
};

export default EmbeddablesPage;
