import React, { FC } from "react";

import { Layout } from "@/modules/common";
import {
  ItemPage,
  CollectionItem,
  COLLECTION_ITEMS,
} from "@/modules/marketplace";

interface ItemProps {
  data: CollectionItem;
}

const Item: FC<ItemProps> = ({ data }) => {
  return (
    <Layout maxW="container.xl" px={0}>
      <ItemPage data={data} />
    </Layout>
  );
};

interface ItemParams {
  params: {
    slug: string;
    item: string;
  };
}

export function getServerSideProps({ params }: ItemParams) {
  const data = COLLECTION_ITEMS.find((item) => item.slug === params.item);

  return { props: { data } };
}

export default Item;
