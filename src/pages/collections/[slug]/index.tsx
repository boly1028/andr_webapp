import React from "react";

import { Layout } from "@/modules/common";
import {
  COLLECTIONS,
  CollectionPage,
  CollectionData,
} from "@/modules/marketplace";
import { NextPage } from "next";

interface Props {
  data?: CollectionData;
}

const Collection: NextPage<Props> = ({ data }) => {
  if (data == null) {
    return <div />;
  }

  return (
    <Layout maxW="container.xl">
      <CollectionPage data={data} />
    </Layout>
  );
};

Collection.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const data = COLLECTIONS.find((i) => i.slug === slug);

  return { data };
};

Collection.displayName = "Collection";

export default Collection;
