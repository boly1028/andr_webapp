import React, { FC } from "react";
import { Button, HStack, Input } from "@/theme/ui-elements";
import { BackdropCard, DownloadIcon } from "@/modules/common";
import { parseJsonFromFile } from "@/lib/json";
import { JSONSchema7 } from "json-schema";
import { useRouter } from "next/router";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { toast } from "react-toastify";
import { UPLOAD_TEMPLATE } from "@/lib/schema/templates/upload";
import { Box, Image, Link, Text } from "@chakra-ui/react";

/**
 * A Static template card component to display in flex-builder store (with other dynamic templates)
 * It act as entrypoint for uploading a .flex file as template and start building on top of it.
 *
 * @param {importTemplate} - From Constants used to generate default template
 * @param {flexFile} - User uploads flex file
 *
 * @return It parse the file, store in session storage and route user to flex builder template form
 */

interface FlexUploadCardProps {}
const FlexUploadCard: FC<FlexUploadCardProps> = (props) => {
  const {} = props;
  const router = useRouter();

  /**Custom static template for uploader card */
  const template = UPLOAD_TEMPLATE;

  /**Handle flex file input */
  const handleFileInput = async (file: File) => {
    /**Parse content of file to JSON. If any validation is needed, this is probably a good place to add.
     * However, make it reusable as same validation will be done at template builder routes.
     */
    const json: JSONSchema7 = await parseJsonFromFile(file);

    /**Store parsed file in session Storage. We can use state also to store but this
     * will give prevent storing/managing file which in most case won't be major operation
     */
    sessionStorage.setItem("ANDROMEDA_TEMPLATE", JSON.stringify(json));
    toast("Imported Template");

    /**Send user to template route where the file will be read from storage and form builder will be created */
    router.push(SITE_LINKS.flexBuilderTemplate());
  };

  return (
    <Box
      as="label"
      htmlFor="templateInput"
      h="full"
      rounded="lg"
      overflow="hidden"
      // _hover={{ scale: "105%", borderWidth: "1px" }}
      borderColor="dark.300"
      cursor="pointer"
      transform="auto"
      transition="all"
      transitionDuration="150ms"
      transitionTimingFunction="ease-out"
    >
      <BackdropCard
        logoComponent={<Image w="50%" mb="20%" src={template.icon} />}
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
            {template.name}
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
            {template.description}
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
