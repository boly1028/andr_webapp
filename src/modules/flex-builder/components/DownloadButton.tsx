import React, { useCallback } from "react";
import { IconButton } from "@chakra-ui/react";
import type { JSONSchema7 } from "json-schema";

import { DownloadIcon } from "@/modules/common";
import { downloadURI } from "@/utils";

/**
 * Download flex component
 * @param {schema} SchemaType
 * @param {uiSchema} Record<string, JSONSchema7
 * @param {formData} Record<string, JSONSchema7>
 */
export interface DownloadFlexProps {
  schema: JSONSchema7;
  uiSchema: JSONSchema7;
  formData: JSONSchema7;
}

function DownloadButton({ schema, uiSchema, formData }: DownloadFlexProps) {
  /**Moved from use effect to useCallback as we only need to calculate url on button click */
  const handleDownload = useCallback(() => {
    if (schema == null || uiSchema == null || formData == null) {
      return;
    }

    const flexExport: Record<string, any> = {
      schema,
      uiSchema,
      formData,
    };

    //Load data to be exported by the browser
    const flexBlob = new Blob([JSON.stringify(flexExport)], {
      type: "text/plain",
    });

    // Create URL for form
    const url = URL.createObjectURL(flexBlob);

    // Create a name from app name
    const appName = formData["publish-settings"]?.name || "app";
    downloadURI(url, `template_${appName}.flex`);

    // Revoke created url to free up space
    URL.revokeObjectURL(url);
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
