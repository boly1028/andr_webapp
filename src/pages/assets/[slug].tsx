import React, { FC } from "react";

import { Layout } from "@/modules/common";
import { AssetPage, NftAsset, NFT_ITEMS } from "@/modules/assets";

interface AssetProps {
  data: NftAsset;
}

const Asset: FC<AssetProps> = ({ data }) => {
  return (
    <Layout>
      <AssetPage data={data} />
    </Layout>
  );
};

interface AssetParams {
  params: {
    slug: string;
  };
}

export function getServerSideProps({ params }: AssetParams) {
  const data = NFT_ITEMS.find((item) => item.slug === params.slug);

  return { props: { data } };
}

export default Asset;
