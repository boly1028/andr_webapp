import absoluteUrl from "next-absolute-url";
import { NextPage } from "next";

import {
  Box,
  Circle,
  Text,
  Icon,
  useColorModeValue,
  Heading,
  HStack,
} from "@chakra-ui/react";

import Form from "@rjsf/chakra-ui";

import { Image as ImageIcon } from "lucide-react";

import { FlexBuilderTemplateProps } from "@/types";

type Props = {
  template: FlexBuilderTemplateProps;
};

const TemplatePage: NextPage<Props> = ({ template }) => (
  <Box maxW="960px" mx="auto" px={{ base: 4, md: 8 }}>
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
          {template.name}
        </Heading>
      </HStack>
      <Text color={"gray.500"} fontSize="sm" my={4}>
        {template.description}
      </Text>
      <Form schema={template.schema} />
    </Box>
  </Box>
);

TemplatePage.getInitialProps = async ({ req, query }) => {
  const { origin } = absoluteUrl(req);
  const { id } = query;

  const res = await fetch(`${origin}/api/flex-builder/${id}`);
  const json = await res.json();
  return { template: json };
};

export default TemplatePage;
