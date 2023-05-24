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
      formData
    })
    const flexURI = await createFlexUrl(flexFile);
    router.push(SITE_LINKS.appBuilder(flexURI))
  }, [schema, uiSchema, formData]);

  return (
    <Tooltip label={`Open in App Builder`} bg='base.white' placement='top'>
      <IconButton
        aria-label="Copy Template"
        variant="outline"
        icon={<AppBuilder boxSize={5} color="gray.500" />}
        onClick={handleRoute}
      />
    </Tooltip>
  );
}

export default OpenInAppBuilderButton;
