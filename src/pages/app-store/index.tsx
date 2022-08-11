import { Layout } from "@/modules/common";
import PagePlaceholder from "@/modules/common/components/PagePlaceholder";
import type { NextPage } from "next";

const AppStorePage: NextPage = () => {
  return (
    <Layout>
      <PagePlaceholder
        imageUrl="/placeholders/app-store.png"
        description="We offer prebuilt customizable Starter Templates to assist in more quickly and 
        accurately building Apps and ADOs. The App Store offers a variety of these Starter 
        Templates that can be used with both our Flex & App Builders. These solutions can 
        range from simple common tasks to distinctive large builds. Similar support 
        elements, such as Staging Templates, can also be found here. Complex or simple 
        the App Store helps make building easier, better, faster."
      />
    </Layout>
  );
};

export default AppStorePage;
