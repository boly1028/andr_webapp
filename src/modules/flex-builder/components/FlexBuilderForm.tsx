// Flex-Builder Form container with handling for: schema processing, module management routines
// updateForm(), addSchemaModule(), removeSchemaModule(), changeSchemaID
// addModule, removeModule, deleteModule, changePanelName
import React, {
  FC,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Button, HStack, Flex, IconButton } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import Form from "@rjsf/chakra-ui";
//Simple typeOf comparison utility from chakra-ui
import { isUndefined } from "@chakra-ui/utils"; //https://github.com/chakra-ui/chakra-ui/blob/790d2417a3f5d59e2d69229a027af671c2dc0cbc/packages/utils/src/assertion.ts
import _ from "lodash";

import { GasIcon } from "@/modules/common";
import { AddModuleModal, DownloadButton } from "@/modules/flex-builder";
import type {
  FlexBuilderTemplateProps,
  FlexBuilderTemplateModuleProps,
} from "@/modules/flex-builder";

import widgets from "./widgets";
import FieldTemplate from "./FieldTemplate";
import TitleField from "./TitleField";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import ArrayFieldTemplate from "./ArrayFieldTemplate";
import { cloneDeep } from "@apollo/client/utilities";
import {
  addSchemaModule,
  changeSchemaID,
  deleteSchemaModule,
  duplicatePanelSchema,
} from "../utils/schemaTransform";
import { SCHEMA } from "@/lib/schema/utils";

type FlexBuilderFormProps = {
  template: FlexBuilderTemplateProps;
  isLoading?: boolean;
  onChange?: (data: any) => void;
  onSubmit?: (data: any) => void;
  onError?: () => void;
  onEstimate?: (data: any) => void;
};

const FlexBuilderForm: FC<FlexBuilderFormProps> = ({
  template,
  onSubmit,
  onError,
  isLoading,
  onEstimate,
}) => {
  const [schema, setSchema] = useState(cloneDeep(template.schema));
  const [uiSchema, setUiSchema] = useState(cloneDeep(template.uiSchema));
  const [formData, setFormData] = useState(cloneDeep(template.formData));

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
        schemaDefinitions: schema?.definitions ?? {},
        schemaProperties: schema?.properties ?? {},
        uiSchema: uiSchema,
        formData: formData,
      });
      console.log("deleteModule form.formData:", form.formData);
      updateForm(form);
    },
    [schema, uiSchema, formData],
  );

  const toggleModule = useCallback(
    (uuid: string, enabled: boolean) => {
      //TODO: Replace from split_pop, as it will conflict with new panel renaming feature
      //////////////////////////////////////////////////// New panel name means that the evaultaion of _ (which is from "root_") could be true, but not desired for removal (e.g. "a_panel_name")
      setFormData((prev) => {
        const id = uuid.split("_").pop();
        const cloneData = cloneDeep(prev);
        cloneData[`${id}`]["$enabled"] = enabled;
        return cloneData;
      });
    },
    [setFormData, formData],
  );

  const addModule = useCallback(
    (module: FlexBuilderTemplateModuleProps) => {
      let newId = SCHEMA.suid();
      while (!!schema?.definitions?.[newId]) {
        newId = SCHEMA.nextSuid(newId);
      }
      // dataProcessing should be performed in the AddSchemaModule not in this module
      const form = addSchemaModule(newId, module.schema, {
        schemaDefinitions: schema?.definitions ?? {},
        schemaProperties: schema?.properties ?? {},
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
      const form = duplicatePanelSchema(panelName, {
        schemaDefinitions: schema?.definitions ?? {},
        schemaProperties: schema?.properties ?? {},
        uiSchema: uiSchema,
        formData: formData,
      });
      // console.log("changeSchemaID form.formData:", form.formData);
      updateForm(form);
    },
    [formData, uiSchema, schema],
  );

  // Replicate an existing panel identification key with new name
  const changePanelName = useCallback(
    (newName: string, oldName: string) => {
      const form = changeSchemaID(oldName, newName, {
        schemaDefinitions: schema?.definitions ?? {},
        schemaProperties: schema?.properties ?? {},
        uiSchema: uiSchema,
        formData: formData,
      });
      updateForm(form);
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
  const FORM_CONTEXT_UPDATE = useMemo(() => {
    return Math.random();
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
      fields={{ TitleField }}
      FieldTemplate={FieldTemplate}
      ArrayFieldTemplate={ArrayFieldTemplate}
      ObjectFieldTemplate={ObjectFieldTemplate}
      widgets={{ ...widgets }}
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
            schema={schema as JSONSchema7}
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
