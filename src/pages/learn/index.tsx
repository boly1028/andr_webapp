import { Layout } from "@/modules/common";
import PagePlaceholder from "@/modules/common/components/PagePlaceholder";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";
import { LearnPage } from "@/modules/learn";
import type { NextPage } from "next";

const Page: NextPage = () => {
  //const noRef = null; // alternate to noreferrer

  return (
    <Layout activeLink={ILinkItemKey.LEARN}>
      <LearnPage />
    </Layout>
  );
};

export default Page;
