import React from "react";
import { NextPage } from "next";

import { Layout } from "@/modules/common";
import {
  ItemPage,
  CollectionItem,
  COLLECTION_ITEMS,
} from "@/modules/marketplace";

interface ItemProps {
  data?: CollectionItem;
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
  const data = COLLECTION_ITEMS.find((i) => i.slug === item);

  return { data };
};

export default Item;
