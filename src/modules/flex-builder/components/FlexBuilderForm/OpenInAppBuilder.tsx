import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";

import { AppBuilder, CopyButton, CopyIcon, DownloadIcon } from "@/modules/common";
import {
  ITemplateFormData,
  ITemplateSchema,
  ITemplateUiSchema,
} from "@/lib/schema/templates/types";
import { createFlexFile, createFlexUrl } from "@/lib/schema/utils/flexFile";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { useRouter } from "next/router";

/**
 * Download flex component
 * @param {schema} SchemaType
 * @param {uiSchema} Record<string, JSONSchema7
 * @param {formData} Record<string, JSONSchema7>
 */
interface OpenInAppBuilderProps {
  schema?: ITemplateSchema;
  uiSchema?: ITemplateUiSchema;
  formData?: ITemplateFormData;
}

function OpenInAppBuilderButton({ schema, uiSchema, formData }: OpenInAppBuilderProps) {
  const router = useRouter();
  const handleRoute = useCallback(async () => {
    if (!schema || !uiSchema || !formData) {
      return "";
    }
    const flexFile = await createFlexFile({
      schema,
      formData,
      order:uiSchema?.["ui:order"]
    })
    sessionStorage.setItem("ANDROMEDA_TEMPLATE", JSON.stringify(flexFile));
    router.push(SITE_LINKS.appBuilder())
  }, [schema, uiSchema, formData]);

  return (
    <Tooltip label={`Open in App Builder`} placement='top'>
      <IconButton
        aria-label="Open in App Builder"
        variant="outline"
        icon={<AppBuilder boxSize={5} color="gray.500" />}
        onClick={handleRoute}
        _hover={{
          background: 'rgba(255, 255, 255, 0.08)',
        }}
        sx={{ svg: { color: 'rgba(255, 255, 255, 0.92)' } }}
      />
    </Tooltip>
  );
}

export default OpenInAppBuilderButton;
