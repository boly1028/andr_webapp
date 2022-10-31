import { AppStorePage } from "@/modules/app-store";
import { Layout } from "@/modules/common";
import type { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Layout>
      <AppStorePage />
    </Layout>
  );
};

export default Page;
