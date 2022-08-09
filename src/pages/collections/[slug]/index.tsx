import React from "react";

import { Layout } from "@/modules/common";
import {
  COLLECTIONS,
  CollectionPage,
  CollectionData,
} from "@/modules/marketplace";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

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


// DIRECTLY CALLING DATABASE FUNCTION IS FASTER THAN CALLING THROUGH API ENDPOINT

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: COLLECTIONS.map((item) => ({ params: { slug: item.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const { params } = ctx;
  const slug = params?.slug as string;
  const data = COLLECTIONS.find((item) => item.slug === slug);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data: data },
    revalidate: 300,
  };
};

Collection.displayName = "Collection";

export default Collection;
