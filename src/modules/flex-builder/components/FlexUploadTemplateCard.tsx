import React, { FC } from "react";
import { FlexBuilderTemplateListItemCard } from ".";
import { FlexBuilderTemplateProps } from "..";
import { Button, Input } from "@/theme/ui-elements";
import { DownloadIcon } from "@/modules/common";
import { parseJsonFromFile } from "@/lib/json";
import { JSONSchema7 } from "json-schema";
import { useRouter } from "next/router";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { toast } from "react-toastify";

interface FlexUploadTemplateCardProps {}
const FlexUploadTemplateCard: FC<FlexUploadTemplateCardProps> = (props) => {
  const {} = props;
  const router = useRouter();

  const template = UPLOAD_TEMPLATE;
  const handleFileInput = async (file: File) => {
    const json: JSONSchema7 = await parseJsonFromFile(file);
    sessionStorage.setItem("ANDROMEDA_TEMPLATE", JSON.stringify(json));
    toast('Imported Template')
    router.push(SITE_LINKS.flexBuilderTemplate());
  };

  return (
    <FlexBuilderTemplateListItemCard template={template}>
      <Button
        as="label"
        htmlFor="templateInput"
        mt={10}
        isFullWidth
        size="lg"
        colorScheme="purple"
        leftIcon={!template.disabled ? <DownloadIcon boxSize={5} /> : undefined}
        isDisabled={template.disabled}
        cursor="pointer"
      >
        {template.disabled ? "Coming Soon" : "Import Template"}
      </Button>
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
        accept=".flex"
        srOnly
      />
    </FlexBuilderTemplateListItemCard>
  );
};

export const UPLOAD_TEMPLATE: FlexBuilderTemplateProps = {
  id: "import",
  name: "Import Template",
  icon: "",
  description: "Import your template and start from there.",
  opts: [
    "Import saved template",
    "Add on your prefered modules",
    "Save as a template",
    "Publish and use!",
  ],
  ados: [],

  modules: [],
};

export default FlexUploadTemplateCard;
