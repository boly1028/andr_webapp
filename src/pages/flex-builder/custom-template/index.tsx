import type { NextPage } from "next";
import { FileCheckIcon, Layout, PageHeader } from "@/modules/common";
import { useMemo } from "react";
import { FlexBuilderForm, StagingDocumentsModal } from "@/modules/flex-builder";
import { Box, Flex, Text } from "@/theme/ui-elements";
import { DownloadFlexProps } from "@/modules/flex-builder/components/DownloadButton";
import { UPLOAD_TEMPLATE } from "@/modules/flex-builder/components/FlexUploadTemplateCard";


/**
 * Flex Builder Custom template page which takes flex from session storage and renders
 * as form builder
 */
const FlexBuilderCustomTemplate: NextPage = () => {

  /** Template contains same structure as Blank App with schema, formData, uiSchema added from flex file uploaded by user */
  const template = useMemo(() => {
    /**Session Storage is not available for SSR, Only render when window is defined (Client Side) */
    if (typeof window === "undefined") return;

    /** Get Flex from storage. If any validation is required, add it here. Add the same validation
     * during upload also so user knows early if wrong file is uploaded
     */
    const storageData = sessionStorage.getItem("ANDROMEDA_TEMPLATE");
    if (storageData) {
      const jsonValue = JSON.parse(storageData) as DownloadFlexProps;
      return {
        ...UPLOAD_TEMPLATE,
        ...jsonValue,
      };
    }
  }, []);

  const handleSubmit = async (
    {
      formData,
    }: {
      formData: object;
    },
    simulate = false,
  ) => {
    /** TODO: Handle submission of form here. It will be instatiate call as this will always be a new contract */
    console.log(formData);
  };

  //TODO: Setup staging availability flags for loading staging sections if passed
  const staging_available = false;

  if (!template) return null;
  console.log(template);

  return (
    <Layout>
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onEstimate={(data: any) => handleSubmit(data, true)}
        />
      </Box>
    </Layout>
  );
};

export default FlexBuilderCustomTemplate;
