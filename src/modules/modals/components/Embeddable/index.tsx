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
import { downloadBlob } from "@/utils/file";
import EmbeddabePublish from "./Publish";

const EmbeddableModal: FC<EmbeddableModalProps> = ({ config, eKey }) => {
  const { close } = useGlobalModalContext();

  const uri = useMemo(() => createEmbeddableUrl(config), [config]);
  const handleDownload = () => {
    const configBlob = new Blob([JSON.stringify(config)], {
      type: "text/plain",
    });
    downloadBlob(configBlob, `${config.name}_config.json`)
  }

  return (
    <Box>
      <Text fontWeight="bold" fontSize="lg">
        EMBEDDABLE
      </Text>
      <EmbeddabePublish
        data={config}
        eKey={eKey}
      />
      <Text fontSize="xs" textStyle="light" color="dark.500" mt="2">
        Here&apos;s a preview for your embeddable
      </Text>
      <Box bg='background.800' rounded='lg' p='4' my='4'>
        <Text>
          {SITE_LINKS.embeddablePreview(uri)}
        </Text>
      </Box>

      <HStack justifyContent="end" mt="2">
        <Button onClick={close} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleDownload} variant="outline">
          Download
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
