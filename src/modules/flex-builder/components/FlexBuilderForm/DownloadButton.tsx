import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";

import { DownloadIcon } from "@/modules/common";
import {
  ITemplateFormData,
  ITemplateSchema,
  ITemplateUiSchema,
} from "@/lib/schema/templates/types";
import { IImportantAdoKeys, ITemplate } from "@/lib/schema/types";
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
  template: ITemplate;
}

function DownloadButton({ schema, uiSchema, formData, template }: DownloadFlexProps) {
  /**Moved from use effect to useCallback as we only need to calculate url on button click */
  const handleDownload = useCallback(async () => {
    if (!schema || !uiSchema || !formData) {
      return;
    }

    const flexData = await createFlexFile({
      schema,
      formData,
      template,
      order: uiSchema?.["ui:order"]
    });

    //Load data to be exported by the browser
    const flexBlob = new Blob([JSON.stringify(flexData)], {
      type: "text/plain",
    });

    const appName = formData[IImportantAdoKeys.PUBLISH_SETTING.key]?.name || new Date().getTime().toString();
    console.log(template.id)
    downloadBlob(flexBlob, `${template.id}-${appName}-staging.flex`);
  }, [schema, uiSchema, formData]);

  return (
    <Tooltip label={`Download Template`} bg='base.white' placement='top'>
      <IconButton
        aria-label="Download Template"
        variant="outline"
        icon={<DownloadIcon boxSize={5} color="gray.500" />}
        onClick={handleDownload}
        _hover={{
          background: 'rgba(255, 255, 255, 0.08)',
        }}
        sx={{ svg: { color: 'rgba(255, 255, 255, 0.92)' } }}
      />
    </Tooltip>
  );
}

export default DownloadButton;
