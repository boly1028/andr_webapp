import type { NextPage } from "next";
import { FileCheckIcon, Layout, PageHeader } from "@/modules/common";
import { useEffect, useState } from "react";
import { FlexBuilderForm, StagingDocumentsModal } from "@/modules/flex-builder";
import { Box, Flex, Text } from "@/theme/ui-elements";
import { useCodeId } from "@/lib/andrjs";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { useInstantiateModal } from "@/modules/modals/hooks";
import { useWallet } from "@/lib/wallet";
import { useRouter } from "next/router";
import { ITemplate } from "@/lib/schema/types";
import { parseFlexFile, parseFlexUrl } from "@/lib/schema/utils/flexFile";
import { ILinkItemKey } from "@/modules/common/components/Sidebar";

/**
 * Flex Builder Custom template page which takes flex from session storage and renders
 * as form builder
 */

interface Props { }

const FlexBuilderCustomTemplate: NextPage<Props> = ({ }) => {
  const router = useRouter();
  const templateUri = router.query.data as string;

  const codeId = useCodeId("app");
  const construct = useConstructAppMsg();
  const openModal = useInstantiateModal(codeId);
  const account = useWallet();
  const [template, setTemplate] = useState<ITemplate>();

  useEffect(() => {
    /**Session Storage is not available for SSR, Only render when window is defined (Client Side) */
    if (typeof window === "undefined") return;
    if (templateUri) {
      parseFlexUrl(templateUri).then((res) => {
        setTemplate(res);
      });
    } else {
      /** Get Flex from storage. If any validation is required, add it here. Add the same validation
       * during upload also so user knows early if wrong file is uploaded
       */
      const storageData = sessionStorage.getItem("ANDROMEDA_TEMPLATE");
      if (storageData) {
        const jsonValue = JSON.parse(storageData);
        parseFlexFile(jsonValue).then((res) => {
          setTemplate(res);
        });
      }
    }
  }, [templateUri]);

  const handleSubmit = async (
    {
      formData,
    }: {
      formData: any;
    },
    simulate = false,
  ) => {
    if (codeId === -1) {
      console.warn("Code ID not fetched");
      return;
    }
    const msg = construct(formData);
    openModal(msg, simulate);
  };

  //TODO: Setup staging availability flags for loading staging sections if passed
  const staging_available = false;

  if (!template) return null;

  return (
    <Layout activeLink={ILinkItemKey.ADO_BUILDER}>
      <PageHeader title={template.name} desc={template.description} />

      <Box mt={10}>
        {/* Staging section to be shown when declared */}
        {/* ToDO: Modularize as component? */}
        {staging_available && (
          <Flex
            align="center"
            border="1px solid"
            borderColor="primary.300"
            borderRadius="lg"
            bg="primary.25"
            mb={4}
            p={3}
          >
            <Box mr={4}>
              <Flex
                justify="center"
                align="center"
                bg="primary.100"
                color="primary.700"
                borderRadius="full"
                p={3}
              >
                <FileCheckIcon boxSize={6} />
              </Flex>
            </Box>

            <Box flex={1}>
              <Text color="primary.700" fontWeight={500}>
                Staging Available
              </Text>
              <Text color="primary.600" fontSize="sm">
                Need to perform this operation multiple times? Staging documents
                are available.
              </Text>
            </Box>

            <StagingDocumentsModal />
          </Flex>
        )}
        {/* end of toggleable staging section */}
        <FlexBuilderForm
          template={template}
          onSubmit={handleSubmit}
          notReady={!codeId || codeId === -1 || !account}
          addButtonTitle="Add App Component"
        />
      </Box>
    </Layout>
  );
};

export default FlexBuilderCustomTemplate;
