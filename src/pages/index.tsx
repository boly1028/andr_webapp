import React, { FC } from "react";
import { NextPage } from "next";
import absoluteUrl from "next-absolute-url";
import NextLink from "next/link";

import {
  Box,
  Circle,
  Flex,
  Spacer,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  Icon,
  useColorModeValue,
  Heading,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";

import {
  Check as CheckIcon,
  Image as ImageIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";

import { FlexBuilderTemplateProps } from "@/types";

type CardProps = {
  data: FlexBuilderTemplateProps;
};

const Card: FC<CardProps> = ({ data }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      border="1px"
      borderColor={"gray.300"}
      rounded={"xl"}
      overflow={"hidden"}
    >
      <Flex
        direction="column"
        height="100%"
        bg={useColorModeValue("white", "gray.900")}
        p={4}
      >
        <Box>
          <HStack spacing={4}>
            <Circle size="36px" bg="purple.600" color="white">
              <Icon as={ImageIcon} color="white" />
            </Circle>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"xl"}
              fontFamily={"body"}
              fontWeight={600}
            >
              {data.name}
            </Heading>
          </HStack>
          <Text color={"gray.500"} fontSize="sm" my={4}>
            {data.description}
          </Text>

          <List spacing={3}>
            {data.opts.map((opt) => (
              <ListItem key={opt}>
                <Text color={"gray.500"} fontSize="sm">
                  <ListIcon as={CheckIcon} color="purple.400" />
                  {opt}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
        <Spacer />
        <NextLink href={`flex-builder/${data.id}`} passHref>
          <Button
            fontWeight={500}
            fontSize="md"
            mt={10}
            w={"full"}
            bg={"purple.600"}
            color={"white"}
            rounded={"xl"}
            size="lg"
            rightIcon={data.disabled ? undefined : <ArrowRightIcon />}
            _hover={{
              bg: "purple.700",
            }}
            _focus={{
              bg: "purple.800",
            }}
            isActive={data.disabled}
          >
            {data.disabled ? "Coming Soon" : "Get Started"}
          </Button>
        </NextLink>
      </Flex>
    </Box>
  );
};

type Props = {
  templates: Array<FlexBuilderTemplateProps>;
};

const IndexPage: NextPage<Props> = ({ templates }) => (
  <Box maxW="960px" mx="auto" px={{ base: 4, md: 8 }}>
    <Heading fontWeight="600" fontSize="xl" my={2}>
      ADO & NFT Builder Templates
    </Heading>
    <Text fontSize="sm" color="gray.500">
      Quickly create and publish NFT collectibles, DeFi instruments and generic
      ADOs from starter templates!
    </Text>
    <SimpleGrid minChildWidth="240px" spacing="20px" my={8}>
      {templates.map((template: FlexBuilderTemplateProps) => (
        <Card key={template.id} data={template} />
      ))}
    </SimpleGrid>
  </Box>
);

IndexPage.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/flex-builder`);
  const json = await res.json();
  return { templates: json };
};

export default IndexPage;
