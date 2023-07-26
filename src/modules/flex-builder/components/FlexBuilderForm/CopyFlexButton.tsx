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
      formData
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
            background: 'rgba(68, 129, 255, 1)',
            border: 'none',
            svg: { color: 'white' }
          }}
        />
      </Tooltip>
    </CopyButton>
  );
}

export default CopyFlexButton;
