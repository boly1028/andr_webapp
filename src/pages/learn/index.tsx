import { Layout } from "@/modules/common";
import PagePlaceholder from "@/modules/common/components/PagePlaceholder";
import type { NextPage } from "next";

const LearnPage: NextPage = () => {
  return (
    <Layout>
      <PagePlaceholder
        imageUrl="/placeholders/learn.png"
        description="There are Andromeda and ADO specific concepts, tools and terminology which 
        need introductory explanations. Here we provide Tool &amp; Concept Summaries, 
        FAQs, a Knowledge Base, User Guides, and more."
      />
    </Layout>
  );
};

export default LearnPage;
