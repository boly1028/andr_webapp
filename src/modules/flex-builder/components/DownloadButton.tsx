import React, { useEffect, useState } from "react";
import { IconButton, Link } from "@chakra-ui/react";
import type { JSONSchema7 } from "json-schema";

import { DownloadIcon } from "@/modules/common";

interface Props {
  schema: JSONSchema7;
  uiSchema: JSONSchema7;
  formData: JSONSchema7;
}

function DownloadButton({ schema, uiSchema, formData }: Props) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (schema == null || uiSchema == null || formData == null) {
      return;
    }

    const flexExport: Record<string, any> = {
      schema,
      "ui-schema": uiSchema,
      formData,
    };

    //Load data to be exported by the browser
    const flexBlob = new Blob([JSON.stringify(flexExport)], {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(flexBlob);
    setDownloadUrl(url);
  }, [schema, uiSchema, formData]);

  return (
    <IconButton
      as={Link}
      aria-label="Download Templace"
      variant="outline"
      icon={<DownloadIcon boxSize={5} color="gray.500" />}
      download="template.flex"
      href={downloadUrl}
      target="_blank"
      isLoading={downloadUrl == null}
    />
  );
}

export default DownloadButton;
