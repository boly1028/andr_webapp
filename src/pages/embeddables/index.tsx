import { Layout } from "@/modules/common";
import { ILinkItemKey } from "@/modules/common/components/sidebar/utils";
import EmbeddablePage from "@/modules/embeddables/components/Page";
import type { NextPage } from "next";

const EmbeddablesPage: NextPage = () => {
  return (
    <Layout activeLink={ILinkItemKey.EMBEDDABLES}>
      <EmbeddablePage />
      {/* <a
        href="https://andromedaprotocol.github.io/embeddable-marketplace-demo"
        target="_blank"
        rel="noreferrer"
      >
        <PagePlaceholder
          imageUrl="/placeholders/embeddables-preview-0223.png"
          description=""
        />
      </a> */}
    </Layout>
  );
};

export default EmbeddablesPage;
