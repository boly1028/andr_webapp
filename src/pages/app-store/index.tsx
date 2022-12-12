import { AppStorePage } from "@/modules/app-store";
import { Layout } from "@/modules/common";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";
import type { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Layout activeLink={ILinkItemKey.APP_STORE}>
      <AppStorePage />
    </Layout>
  );
};

export default Page;
