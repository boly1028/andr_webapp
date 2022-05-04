import React from "react";
import { NextPage } from "next";

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

Item.getInitialProps = async ({ query }) => {
  const { item } = query;
  const data = NFT_ITEMS.find((i) => i.slug === item);

  return { data };
};

export default Item;
