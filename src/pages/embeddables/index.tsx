import { Layout } from "@/modules/common";
// import PagePlaceholder from "@/modules/common/components/PagePlaceholder";
import type { NextPage } from "next";
import Embeddables from "@/modules/embeddables/components/Embeddables";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";

const EmbeddablesPage: NextPage = () => {
  return (
    <Layout activeLink={ILinkItemKey.EMBEDDABLES}>
      <Embeddables />
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
