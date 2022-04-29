import React from "react";
import { NextPage } from "next";

import { Layout } from "@/modules/common";
import { AssetPage, NftAsset, NFT_ITEMS } from "@/modules/assets";

interface AssetProps {
  data?: NftAsset;
}

const Asset: NextPage<AssetProps> = ({ data }) => {
  if (data == null) {
    return null;
  }

  return (
    <Layout>
      <AssetPage data={data} />
    </Layout>
  );
};

Asset.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const data = NFT_ITEMS.find((item) => item.slug === slug);

  return { data };
};

export default Asset;
