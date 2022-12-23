import { Layout } from "@/modules/common";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";
import { LearnPage } from "@/modules/learn";
import type { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Layout activeLink={ILinkItemKey.LEARN}>
      <LearnPage />
    </Layout>
  );
};

export default Page;
