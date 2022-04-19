import React, { FC } from "react";

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
  HStack,
} from "@chakra-ui/react";

import {
  Check as CheckIcon,
  Image as ImageIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";

type AdoProps = {
  name: string;
  icon: string;
  description: string;
  opts: string[];
  disabled?: boolean;
};

type Props = {
  ado: AdoProps;
};

const BuilderListItem: FC<Props> = ({ ado }) => {
  const wrapperBg = useColorModeValue("white", "gray.800");
  const containerBg = useColorModeValue("white", "gray.900");
  const titleColor = useColorModeValue("gray.700", "white");

  return (
    <Box
      bg={wrapperBg}
      border="1px"
      borderColor={"gray.300"}
      rounded={"xl"}
      overflow={"hidden"}
    >
      <Flex direction="column" height="100%" bg={containerBg} p={4}>
        <Box>
          <HStack spacing={4}>
            <Circle size="36px" bg="purple.600" color="white">
              <Icon as={ImageIcon} color="white" />
            </Circle>
            <Heading
              color={titleColor}
              fontSize={"xl"}
              fontFamily={"body"}
              fontWeight={600}
            >
              {ado.name}
            </Heading>
          </HStack>
          <Text color="gray.500" fontSize="sm" my={4}>
            {ado.description}
          </Text>

          <List spacing={3}>
            {ado.opts.map((opt) => (
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
        <Button
          mt={10}
          isFullWidth
          size="lg"
          colorScheme="purple"
          rightIcon={ado.disabled ? undefined : <ArrowRightIcon />}
          isDisabled={ado.disabled}
        >
          {ado.disabled ? "Coming Soon" : "Get Started"}
        </Button>
      </Flex>
    </Box>
  );
};

export default BuilderListItem;
