import React, { FC } from "react";
import { Flex, Box, Text, SimpleGrid } from "@chakra-ui/react";

import { PageHeader } from "@/modules/common";
import {
  NftItem,
  AuctionListItem,
  TopCollections,
  NFT_TRENDING,
  Trending,
  AUCTIONS,
} from "@/modules/marketplace";
import FeaturedItem from "./FeaturedItem";

const ExplorePage: FC = () => {
  return (
    <Box>
      <PageHeader
        title="Marketplace"
        desc=""
      />

      <Flex mt={8} gap={6}>
        <FeaturedItem
          isMain
          data={{
            image:
              "https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=w600",
            name: "Emperor",
            collection: "https://loremflickr.com/268/268/paris",
          }}
        />
        <SimpleGrid columns={3} spacing={4} flex={1}>
          <FeaturedItem
            data={{
              image:
                "https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=w600",
              name: "Life Tree",
              collection: "https://loremflickr.com/268/268/paris",
            }}
          />
          <FeaturedItem
            data={{
              image:
                "https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=w600",
              name: "Life Tree",
              collection: "https://loremflickr.com/268/268/paris",
            }}
          />
          <FeaturedItem
            data={{
              image:
                "https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=w600",
              name: "Life Tree",
              collection: "https://loremflickr.com/268/268/paris",
            }}
          />
          <FeaturedItem
            data={{
              image:
                "https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=w600",
              name: "Life Tree",
              collection: "https://loremflickr.com/268/268/paris",
            }}
          />
          <FeaturedItem
            data={{
              image:
                "https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=w600",
              name: "Life Tree",
              collection: "https://loremflickr.com/268/268/paris",
            }}
          />
          <FeaturedItem
            data={{
              image:
                "https://lh3.googleusercontent.com/sDhM1yz--cp9As0bh1yPE5HY4f7lOp-Yh3_wMPTXitrXrNxKMjAHarW1st3fchHZ_4lOCH8sBMKDMYgYXf_YCvMt377ERZ2cpRBNow=w600",
              name: "Life Tree",
              collection: "https://loremflickr.com/268/268/paris",
            }}
          />
        </SimpleGrid>
      </Flex>

      <TopCollections />

      <Text textStyle="h1" mt={16} mb={8}>
        Live Auctions
      </Text>
      <SimpleGrid columns={4} spacing={4}>
        {AUCTIONS.map((data) => {
          return <AuctionListItem key={data.id} data={data} />;
        })}
      </SimpleGrid>

      <Trending />
    </Box>
  );
};

export default ExplorePage;
