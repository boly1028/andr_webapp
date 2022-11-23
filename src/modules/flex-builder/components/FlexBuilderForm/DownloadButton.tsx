import React, { useCallback } from "react";
import { IconButton } from "@chakra-ui/react";

import { DownloadIcon } from "@/modules/common";
import {
  ITemplateFormData,
  ITemplateSchema,
  ITemplateUiSchema,
} from "@/lib/schema/templates/types";
import { IImportantAdoKeys } from "@/lib/schema/types";
import { createFlexFile } from "@/lib/schema/utils/flexFile";
import { downloadBlob } from "@/utils/file";

/**
 * Download flex component
 * @param {schema} SchemaType
 * @param {uiSchema} Record<string, JSONSchema7
 * @param {formData} Record<string, JSONSchema7>
 */
export interface DownloadFlexProps {
  schema?: ITemplateSchema;
  uiSchema?: ITemplateUiSchema;
  formData?: ITemplateFormData;
}

function DownloadButton({ schema, uiSchema, formData }: DownloadFlexProps) {
  /**Moved from use effect to useCallback as we only need to calculate url on button click */
  const handleDownload = useCallback(async () => {
    if (!schema || !uiSchema || !formData) {
      return;
    }

    const flexData = await createFlexFile({
      schema,
      formData,
    });

    //Load data to be exported by the browser
    const flexBlob = new Blob([JSON.stringify(flexData)], {
      type: "text/plain",
    });

    const appName = formData[IImportantAdoKeys.PUBLISH_SETTINGS]?.name || "app";
    downloadBlob(flexBlob, `template_${appName}.flex`);
  }, [schema, uiSchema, formData]);

  return (
    <IconButton
      aria-label="Download Template"
      variant="outline"
      icon={<DownloadIcon boxSize={5} color="gray.500" />}
      onClick={handleDownload}
    />
  );
}

export default DownloadButton;
