import React, { useCallback } from "react";
import { Button, IconButton, Text } from "@chakra-ui/react";

import { CopyButton, CliIcon } from "@/modules/common";
import {
  ITemplateFormData,
} from "@/lib/schema/templates/types";
import { ICliQueryGenerator } from "@/lib/andrjs";

/**
 * Download flex component
 * @param {formData} Record<string, JSONSchema7>
 */
interface CopyCliProps {
  formData?: ITemplateFormData;
  onCopy: (formData: any) => string
}

function CopyCliButton({ formData, onCopy }: CopyCliProps) {
  const handleCopy = async () => {
    return onCopy(formData)
  };

  return (
    <CopyButton text={handleCopy} variant="unstyled">
      <IconButton
        aria-label="Export to CLI"
        variant="outline"
        icon={<CliIcon boxSize={5} color="gray.500" />}
      >
      </IconButton>
    </CopyButton>
  );
}

export default CopyCliButton;
