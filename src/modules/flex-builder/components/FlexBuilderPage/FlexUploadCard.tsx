import React, { FC } from "react";
import { HStack, Input } from "@/theme/ui-elements";
import { BackdropCard } from "@/modules/common";
import { parseJsonFromFile } from "@/lib/json";
import { useRouter } from "next/router";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { Box, Image, Link, Text, useToast } from "@chakra-ui/react";
import { IImportantTemplateTypes, ITemplate } from "@/lib/schema/types";
import APP_TEMPLATES from "@/lib/schema/templates";

/**
 * A Static template card component to display in flex-builder store (with other dynamic templates)
 * It act as entrypoint for uploading a .flex file as template and start building on top of it.
 *
 * @param {importTemplate} - From Constants used to generate default template
 * @param {flexFile} - User uploads flex file
 *
 * @return It parse the file, store in session storage and route user to flex builder template form
 */

interface FlexUploadCardProps { }
const FlexUploadCard: FC<FlexUploadCardProps> = (props) => {
  const { } = props;
  const router = useRouter();

  const toast = useToast({
    position: "top-right",
  });
  /**Handle flex file input */
  const handleFileInput = async (file: File) => {
    try {
      /**Parse content of file to JSON. If any validation is needed, this is probably a good place to add.
       * However, make it reusable as same validation will be done at template builder routes.
       */
      const json = await parseJsonFromFile(file) as ITemplate;

      /**Store parsed file in session Storage. We can use state also to store but this
       * will give prevent storing/managing file which in most case won't be major operation
      */
      sessionStorage.setItem("ANDROMEDA_TEMPLATE", JSON.stringify(json));
      toast({
        title: "Imported Template",
        status: "success"
      });
      if (!APP_TEMPLATES.some(t => t.id === json.id)) {
        router.push(SITE_LINKS.flexBuilder(IImportantTemplateTypes.BLANK_CANVAS))
      } else {
        /**Send user to template route where the file will be read from storage and form builder will be created */
        router.push(SITE_LINKS.flexBuilder(json.id));
      }

    } catch (err: any) {
      toast({
        title: "Error while importing",
        status: "error",
        description: (err as any).message
      });
    }
  };

  return (
    <Box
      as="label"
      htmlFor="templateInput"
      h="full"
      rounded="lg"
      overflow="hidden"
      // _hover={{ scale: "105%", borderWidth: "1px" }}
      borderColor="border.main"
      cursor="pointer"
      transform="auto"
      transition="all"
      transitionDuration="150ms"
      transitionTimingFunction="ease-out"
    >
      <BackdropCard
        logoComponent={<Image w="50%" mb="20%" src="/app-templates/icons/blank.png" />}
      >
        <Box px="2" h="full">
          <HStack>
            <Image src="/verified.png" w="4" />
            <Text fontSize="sm" fontWeight="medium">
              Andromeda
            </Text>
          </HStack>
          <Text
            textOverflow="ellipsis"
            w="80%"
            whiteSpace="nowrap"
            overflow="hidden"
            fontSize="xl"
            fontWeight="bold"
            mt="2"
          >
            Saved File
          </Text>
          <Text
            textOverflow="ellipsis"
            w="full"
            whiteSpace="nowrap"
            overflow="hidden"
            mt="1"
            mb="3"
            fontSize="sm"
            fontWeight="light"
            color="dark.500"
          >
            Import .flex file to continue from where you left off
          </Text>
          <HStack mt="auto" justifyContent="end">
            {/* <Button
              as="label"
              htmlFor="templateInput"
              w="full"
              colorScheme="primary"
              leftIcon={
                !template.disabled ? <DownloadIcon boxSize={5} /> : undefined
              }
              isDisabled={template.disabled}
              cursor="pointer"
            >
              {template.disabled ? "Coming Soon" : "Import Template"}
            </Button> */}
            <Input
              onChange={(e) => {
                const file = e.target.files?.item(0);
                if (file) {
                  handleFileInput(file);
                }
              }}
              multiple={false}
              type="file"
              id="templateInput"
              // Only Allow flex file
              accept=".flex"
              srOnly
            />
          </HStack>
        </Box>
      </BackdropCard>
    </Box>
  );
};

export default FlexUploadCard;
