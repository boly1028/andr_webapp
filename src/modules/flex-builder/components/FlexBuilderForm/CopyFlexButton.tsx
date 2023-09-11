import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";

import { CopyButton, CopyIcon, DownloadIcon } from "@/modules/common";
import {
  ITemplateFormData,
  ITemplateSchema,
  ITemplateUiSchema,
} from "@/lib/schema/templates/types";
import { createFlexFile, createFlexUrl } from "@/lib/schema/utils/flexFile";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";

/**
 * Download flex component
 * @param {schema} SchemaType
 * @param {uiSchema} Record<string, JSONSchema7
 * @param {formData} Record<string, JSONSchema7>
 */
interface CopyFlexProps {
  schema?: ITemplateSchema;
  uiSchema?: ITemplateUiSchema;
  formData?: ITemplateFormData;
}

function CopyFlexButton({ schema, uiSchema, formData }: CopyFlexProps) {
  const handleCopy = useCallback(async () => {
    if (!schema || !uiSchema || !formData) {
      return "";
    }
    const flexFile = await createFlexFile({
      schema,
      formData,
      order:uiSchema?.["ui:order"]
    })
    const flexURI = await createFlexUrl(flexFile);

    return window.origin + SITE_LINKS.flexBuilderTemplate(flexURI);
  }, [schema, uiSchema, formData]);

  return (
    <CopyButton text={handleCopy} variant="unstyled">
      <Tooltip label={`Copy Template`} bg='base.white' placement='top'>
        <IconButton
          aria-label="Copy Template"
          variant="outline"
          icon={<CopyIcon boxSize={5} color="gray.500" />}
          _hover={{
            background: 'rgba(255, 255, 255, 0.08)',
          }}
          sx={{ svg: { color: 'rgba(255, 255, 255, 0.92)' } }}        />
      </Tooltip>
    </CopyButton>
  );
}

export default CopyFlexButton;
