import { Layout } from "@/modules/common";
import PagePlaceholder from "@/modules/common/components/PagePlaceholder";
import type { NextPage } from "next";

const DashboardPage: NextPage = () => {
  return (
    <Layout>
      <PagePlaceholder
        imageUrl="/placeholders/overview.png"
        description="The overview dashboard offers a quick reference heads-up display of your most 
            recent and relevant activity. It can also be used to more conveniently navigate to 
            task specific sections of the app. Extended support for customizable widget layouts 
            and data sorting configurations is planned for later versions."
      />
    </Layout>
  );
};

export default DashboardPage;
