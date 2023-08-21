import { Layout } from "@/modules/common";
import { ILinkItemKey } from "@/modules/common/components/sidebar/utils";
import type { NextPage } from "next";
import Embeddables from "@/modules/embeddables/components/Embeddables";

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
