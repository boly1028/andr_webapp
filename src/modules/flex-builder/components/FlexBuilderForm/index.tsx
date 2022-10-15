// Flex-Builder Form container with handling for: schema processing, module management routines
// updateForm(), addSchemaModule(), removeSchemaModule(), changeSchemaID
// addModule, removeModule, deleteModule, changePanelName
import React, { FC, useState, useCallback, useEffect } from "react";
import { Button, HStack, Flex, IconButton } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import _ from "lodash";

import { GasIcon } from "@/modules/common";
import { AddModuleModal, DownloadButton } from "@/modules/flex-builder";

import { cloneDeep } from "@apollo/client/utilities";
import {
  addSchemaModule,
  changeSchemaID,
  deleteSchemaModule,
  duplicatePanelSchema,
} from "../../utils/schemaTransform";

import { nextSuid, suid } from "@/lib/schema/utils";
import { toast } from "react-toastify";
import { IAndromedaSchemaJSON, ITemplate } from "@/lib/schema/types";
import { ITemplateUiSchema } from "@/lib/schema/templates/types";
import ArrayFieldItemTemplate from "./templates/ArrayFieldItemTemplate";
import validator from "./validator";
import Form from "./Form";

type FlexBuilderFormProps = {
  template: ITemplate;
  isLoading?: boolean;
  onChange?: (data: any) => void;
  onSubmit?: (data: any) => void;
  onError?: () => void;
  onEstimate?: (data: any) => void;
  noValidate?: boolean;
};

const FlexBuilderForm: FC<FlexBuilderFormProps> = ({
  template,
  onSubmit,
  onError,
  isLoading,
  onEstimate,
  noValidate = false,
}) => {
  const [schema, setSchema] = useState(cloneDeep(template.schema));
  const [uiSchema, setUiSchema] = useState(
    cloneDeep(template.uiSchema ?? ({} as ITemplateUiSchema)),
  );
  const [formData, setFormData] = useState(cloneDeep(template.formData ?? {}));

  const [dirty, setDirty] = useState(false); // Flag for monitoring if data has been entered which is used to set page exit warnings prior to data loss from leaving page

  /**
    useWarnIfUnsavedChanges(
      dirty,
      "Any configurations you have made will be lost.\nAre you sure that you want to leave?",
    );
    **/

  const updateForm = (form: any) => {
    setSchema(form.schema);
    setUiSchema(form.uiSchema);
    setFormData(form.formData);
  };

  const deleteModule = useCallback(
    (uuid: string) => {
      const form = deleteSchemaModule(uuid, {
        schema: schema,
        uiSchema: uiSchema,
        formData: formData,
      });
      console.log("deleteModule form.formData:", form.formData);
      updateForm(form);
    },
    [schema, uiSchema, formData],
  );

  const toggleModule = useCallback(
    (id: string, enabled: boolean) => {
      setFormData((prev) => {
        const cloneData = cloneDeep(prev);
        cloneData[`${id}`]["$enabled"] = enabled;
        return cloneData;
      });
    },
    [setFormData, formData],
  );

  const addModule = useCallback(
    (module: IAndromedaSchemaJSON) => {
      let newId = suid();
      while (!!schema?.definitions?.[newId]) {
        newId = nextSuid(newId);
      }
      // dataProcessing should be performed in the AddSchemaModule not in this module
      const form = addSchemaModule(newId, module, {
        schema: schema,
        uiSchema: uiSchema,
        formData: formData,
      });
      updateForm(form);
    },
    [schema, uiSchema, formData],
  );

  // Replicate an existing panel identification key with new name
  const duplicatePanel = useCallback(
    (panelName: any) => {
      let newId = suid();
      while (!!schema?.definitions?.[newId]) {
        newId = nextSuid(newId);
      }
      const form = duplicatePanelSchema(panelName, newId, {
        schema: schema,
        uiSchema: uiSchema,
        formData: formData,
      });
      toast(`Duplicated panel with id: ${newId}`, {
        type: "info",
      });
      // console.log("changeSchemaID form.formData:", form.formData);
      updateForm(form);
    },
    [formData, uiSchema, schema],
  );

  // Replicate an existing panel identification key with new name
  const changePanelName = useCallback(
    (newName: string, oldName: string) => {
      console.log("Here");
      const form = changeSchemaID(oldName, newName, {
        schema: schema,
        uiSchema: uiSchema,
        formData: formData,
      });
      if (form) {
        updateForm(form);
        toast.success(`Rename panel to: ${newName}`);
      } else {
        toast.error(`Unable to rename panel`);
      }
    },
    [formData, schema, uiSchema],
  );

  /**
   * A Constant which update on change of its dependency.
   * It is needed to update the `formContext` in rjsf because they skip function check
   * for rerender which cause components to use older functions until it has some updated
   * non-functional value (Anshu)
   * NOTE- It may cause unnecessary rerender but I hope it wont be affecting performance as we
   * do not have large list of modules. Though using memo will considerably decrease rerenders
   */
  const [FORM_CONTEXT_UPDATE, setFORM_CONTEXT_UPDATE] = useState(Math.random());
  useEffect(() => {
    const tId = setTimeout(() => {
      setFORM_CONTEXT_UPDATE(Math.random());
    }, 500);
    return () => clearTimeout(tId);
  }, [formData, uiSchema, schema]);

  return (
    <Form
      schema={schema as JSONSchema7}
      uiSchema={uiSchema}
      formData={formData}
      formContext={{
        // Pass actions to form for panel processing operations
        toggleModule: toggleModule,
        deleteModule: deleteModule,
        changePanelName: changePanelName,
        duplicatePanel: duplicatePanel,
        schema,
        FORM_CONTEXT_UPDATE,
      }}
      onChange={({ formData: _formData }) => {
        if (!dirty) {
          setDirty(true);
        }
        setFormData(_formData);
      }}
      onSubmit={onSubmit}
      onError={onError}
      noValidate={noValidate}
    >
      {/* Add Modules Action */}
      {template.modules && (
        <AddModuleModal items={template.modules} onAdd={addModule} />
      )}

      {/* Action Footer */}
      <Flex mt={8} justify="right">
        <HStack spacing={4}>
          {/* TODO
                Temporarily disabling Estimate fee button as this process method:
                #1) should require form validation prior to processing
                #2 is loosing data upon processing 
                -needs state mgmt 
                or
                -closure operations for modals return to form repopulation
            */}
          <IconButton
            aria-label="Estimate gas cost"
            variant="outline"
            icon={<GasIcon boxSize={5} color="gray.500" />}
            // onClick={onEstimate}
            aria-disabled="true"
          />

          <DownloadButton
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
          />
          <Button type="submit" colorScheme="primary" isLoading={isLoading}>
            Publish
          </Button>
        </HStack>
      </Flex>
    </Form>
  );
};

export default FlexBuilderForm;
