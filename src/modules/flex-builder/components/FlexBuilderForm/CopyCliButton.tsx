import React, { useCallback } from "react";
import { Button, IconButton, Text, Tooltip, useToast } from "@chakra-ui/react";

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
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });

  const handleCopy = async () => {
    try {
      return onCopy(formData)
    } catch (err: any) {
      toast({
        title: `Error while creating cli command`,
        description: err.message,
        status: "error",
      });
      return ''
    }
  };

  return (
    <CopyButton text={handleCopy} variant="unstyled">
      <Tooltip label={`Export to CLI`} bg='base.white' placement='top'>
        <IconButton
          aria-label="Export to CLI"
          variant="outline"
          icon={<CliIcon boxSize={5} color="gray.500" />}
        >s
        </IconButton>
      </Tooltip>
    </CopyButton>
  );
}

export default CopyCliButton;
