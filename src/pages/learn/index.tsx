import { Layout } from "@/modules/common";
import PagePlaceholder from "@/modules/common/components/PagePlaceholder";
import type { NextPage } from "next";

const LearnPage: NextPage = () => {
  //const noRef = null; // alternate to noreferrer
  
  return (
    <Layout>
      <a href="https://docs.andromedaprotocol.io" target="_blank" rel="noreferrer">
      <PagePlaceholder
        imageUrl="/placeholders/learn.png"
        description="There are Andromeda and ADO specific concepts, tools and terminology which 
        need introductory explanations. Here we provide Tool &amp; Concept Summaries, 
        FAQs, a Knowledge Base, User Guides, and more.
        Visit docs.andromedaprotocol.io for our documentation."
      />
      </a>
    </Layout>
  );
};

export default LearnPage;
