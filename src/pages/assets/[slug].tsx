import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

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

// DIRECTLY CALLING DATABASE FUNCTION IS FASTER THAN CALLING THROUGH API ENDPOINT

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: NFT_ITEMS.map((item) => ({ params: { slug: item.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<AssetProps> = async (ctx) => {
  const { params } = ctx;
  const slug = params?.slug as string;
  const NFT = NFT_ITEMS.find((item) => item.slug === slug);
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

export default Asset;
