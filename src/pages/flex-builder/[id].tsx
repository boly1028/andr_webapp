import { useEffect } from "react";
import absoluteUrl from "next-absolute-url";
import { NextPage } from "next";
import { JSONSchema7 } from "json-schema";
import {
  Box,
  Circle,
  Text,
  Icon,
  useColorModeValue,
  Heading,
  HStack,
} from "@chakra-ui/react";

import { Image as ImageIcon } from "lucide-react";

import {
  FlexBuilderForm,
  FlexBuilderTemplateProps,
} from "@/modules/flex-builder";

type Props = {
  template: FlexBuilderTemplateProps;
};

const TemplatePage: NextPage<Props> = ({ template }) => {
  return (
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
        <FlexBuilderForm
          schema={template.schema as JSONSchema7}
          uiSchema={template.uiSchema}
          formData={template.formData}
        />
      </Box>
    </Box>
  );
};

TemplatePage.getInitialProps = async ({ req, query }) => {
  const { origin } = absoluteUrl(req);
  const { id } = query;

  const res = await fetch(`${origin}/api/flex-builder/${id}`);
  const json = await res.json();
  return { template: json };
};

export default TemplatePage;