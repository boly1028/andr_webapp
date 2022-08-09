import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Layout } from "@/modules/common";
import { NFT_ITEMS } from "@/modules/assets";
import { ItemPage, CollectionItemData } from "@/modules/marketplace";

interface ItemProps {
  data?: CollectionItemData;
}

const Item: NextPage<ItemProps> = ({ data }) => {
  if (data == null) {
    return <div />;
  }

  return (
    <Layout maxW="container.xl" px={0}>
      <ItemPage data={data} />
    </Layout>
  );
};

// DIRECTLY CALLING DATABASE FUNCTION IS FASTER THAN CALLING THROUGH API ENDPOINT

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: NFT_ITEMS.map((item) => ({ params: { item: item.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ItemProps> = async (ctx) => {
  const { params } = ctx;
  const itemSlug = params?.item as string;
  const NFT = NFT_ITEMS.find((item) => item.slug === itemSlug);
  if (!NFT) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data: NFT },
    revalidate: 300,
  };
};

export default Item;
