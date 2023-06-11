import { cloneDeep } from "@apollo/client/utilities";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, useMemo, useState } from "react";
import { useGlobalModalContext } from "../../hooks";
import { EmbeddableModalProps } from "./types";
import { createEmbeddableUrl } from "@/lib/schema/utils/embeddables";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { CopyButton } from "@/modules/common";

const EmbeddableModal: FC<EmbeddableModalProps> = ({ config }) => {
  const { close } = useGlobalModalContext();

  const uri = useMemo(()=>createEmbeddableUrl(config),[config]);

  return (
    <Box>
      <Text fontWeight="bold" fontSize="lg">
        EMBEDDABLE
      </Text>
      <Text fontSize="xs" textStyle="light" color="dark.500" mt="2">
        Here&apos;s a preview for your embeddable
      </Text>
        <Box bg='newSystem.background.800' rounded='lg' p='4' my='4'>
          <Text>
          {SITE_LINKS.embeddablePreview(uri)}
          </Text>
        </Box>

      <HStack justifyContent="end" mt="2">
        <Button onClick={close} variant="outline">
          Cancel
        </Button>
        <Button
          as='a'
          href={SITE_LINKS.embeddablePreview(uri)}
          target="_blank"
          colorScheme="primary"
          variant="solid"
        >
          Open Link
        </Button>
      </HStack>
    </Box>
  );
};

export default EmbeddableModal;
