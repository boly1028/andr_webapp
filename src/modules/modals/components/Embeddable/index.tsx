import { cloneDeep } from "@apollo/client/utilities";
import {
  Box,
  Button,
  ButtonGroup,
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
import { useAndromedaStore } from "@/zustand/andromeda";

const EmbeddableModal: FC<EmbeddableModalProps> = ({ config, eKey }) => {
  const { close } = useGlobalModalContext();
  const chainId = useAndromedaStore(state => state.chainId);

  const uri = useMemo(() => createEmbeddableUrl(config), [config]);
  const handleDownload = () => {
    const configBlob = new Blob([JSON.stringify(config)], {
      type: "text/plain",
    });
    downloadBlob(configBlob, `${config.name}_config.json`)
  }

  return (
    <Box>
      <Text fontWeight="bold" fontSize="lg" mb='4'>
        EMBEDDABLE
      </Text>
      <EmbeddabePublish
        data={config}
        eKey={eKey}
      />
      {/* <Text fontSize="xs" textStyle="light" color="dark.500" mt="2">
        Here&apos;s a preview for your embeddable
      </Text> */}
      {/* <Box bg='background.800' rounded='lg' p='4' my='4'>
        <Text>
          {SITE_LINKS.embeddablePreview(chainId, uri)}
        </Text>
      </Box> */}
      <ButtonGroup size='sm' mt='6' justifyContent="end" w='full'>
        <Button onClick={close} variant='theme-outline'>
          Cancel
        </Button>
        <Button onClick={handleDownload} variant="theme-outline">
          Download
        </Button>
        <Button
          as='a'
          href={SITE_LINKS.embeddablePreview(chainId, uri)}
          target="_blank"
          variant="theme-low"
        >
          Open Preview
        </Button>
      </ButtonGroup>
    </Box >
  );
};

export default EmbeddableModal;
