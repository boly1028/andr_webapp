import { Layout } from "@/modules/common";
import PagePlaceholder from "@/modules/common/components/PagePlaceholder";
import type { NextPage } from "next";

const EmbeddablesPage: NextPage = () => {
  return (
    <Layout>
      <PagePlaceholder
        imageUrl="/placeholders/embeddables.png"
        description="Embeddables are widgets and plugins for your apps.  They can be rapidly deployed 
        to your website or applications and are skinnable/brandable. They are configurable  
        and connect to functionality you’ve setup on chain. These include a Marketplace, 
        Crowdfund, Subscription Services, and more."
      />
    </Layout>
  );
};

export default EmbeddablesPage;
