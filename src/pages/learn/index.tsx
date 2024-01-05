import { Layout } from "@/modules/common";
import { ILinkItemKey } from "@/modules/common/components/sidebar/utils";
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
