// Flex-Builder Form container with handling for: schema processing, module management routines
// updateForm(), addSchemaModule(), removeSchemaModule(), changeSchemaID
// addModule, removeModule, deleteModule, changePanelName
import React, { FC, useState, useRef, useCallback } from "react";
import { Button, HStack, Flex, IconButton } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import Form from "@rjsf/chakra-ui";
//Simple typeOf comparison utility from chakra-ui
import { isUndefined } from "@chakra-ui/utils"; //https://github.com/chakra-ui/chakra-ui/blob/790d2417a3f5d59e2d69229a027af671c2dc0cbc/packages/utils/src/assertion.ts
import _ from "lodash";

import { GasIcon } from "@/modules/common";
import {
  AddModuleModal,
  DownloadButton,
  type FlexBuilderTemplateProps,
  type FlexBuilderTemplateModuleProps,
} from "@/modules/flex-builder";

import widgets from "./widgets";
import FieldTemplate from "./FieldTemplate";
import TitleField from "./TitleField";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import ArrayFieldTemplate from "./ArrayFieldTemplate";

type FlexBuilderFormProps = {
  template: FlexBuilderTemplateProps;
  isLoading?: boolean;
  onChange?: (data: any) => void;
  onSubmit?: (data: any) => void;
  onError?: () => void;
};

const FlexBuilderForm: FC<FlexBuilderFormProps> = ({
  template,
  onSubmit,
  onError,
  isLoading,
}) => {
  const [schema, setSchema] = useState(template.schema);
  const [uiSchema, setUiSchema] = useState(template.uiSchema);
  const [formData, setFormData] = useState(template.formData);
  const formDataRef = useRef(template.formData); // Storage of formData to hold during panel management tasks (add/remove panel from schema)

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
    //Moved overrides into the Module management functions to help resolve the issue with data loss
    //setFormData(formDataRef.current); //Load stored value for data passing
    /*
    console.log(
      "Form Data:",
      form.formData,
      " | ",
      "Data Ref:",
      formDataRef.current,
    );
    */
    setFormData(form.formData); //Pulled for data loss (assumedly loading only newest panel's predefined formData)
  };

  const addSchemaModule = (
    uuid: string | undefined,
    data: any,
    defaults?: any,
  ): any => {
    const schemaDefinitions = defaults?.schemaDefinitions || {};
    const schemaProperties = defaults?.schemaProperties || {};

    schemaDefinitions[`${uuid}`] = data["schema"];
    schemaDefinitions[`${uuid}`]["properties"]["$type"] = {
      type: "string",
      default: data["schema"]["$id"],
    };
    schemaDefinitions[`${uuid}`]["properties"]["$class"] = {
      type: "string",
      default: data["schema"]["class"],
    };
    schemaDefinitions[`${uuid}`]["properties"]["$classifier"] = {
      type: "string",
      default: data["schema"]["classifier"],
    };
    schemaDefinitions[`${uuid}`]["properties"]["$removable"] = {
      type: "boolean",
      default: true,
    };
    schemaDefinitions[`${uuid}`]["properties"]["$enabled"] = {
      type: "boolean",
      default: true,
    };

    schemaProperties[`${uuid}`] = { $ref: `#/definitions/${uuid}` };

    const uiSchema = defaults?.uiSchema || {};

    // ui-schema
    uiSchema[`${uuid}`] = data["ui-schema"];
    uiSchema[`${uuid}`]["$class"] = { "ui:widget": "hidden" };
    uiSchema[`${uuid}`]["$classifier"] = { "ui:widget": "hidden" };
    uiSchema[`${uuid}`]["$removable"] = { "ui:widget": "hidden" };
    uiSchema[`${uuid}`]["$enabled"] = { "ui:widget": "hidden" };
    uiSchema[`${uuid}`]["$type"] = { "ui:widget": "hidden" };

    // form-data
    const formData = defaults?.formData || {};
    formData[`${uuid}`] = data["form-data"]; // Failed formData trace

    const schema = {
      definitions: schemaDefinitions,
      type: "object",
      properties: schemaProperties,
    };

    return { schema, uiSchema, formData };
  };

  // Called by deleteModule() for processing schemas & formData
  const deleteSchemaModule = (uuid: string, defaults?: any): any => {
    const schemaDefinitions = defaults?.schemaDefinitions || {};
    const schemaProperties = defaults?.schemaProperties || {};

    const uiSchema = defaults?.uiSchema || {};
    const formData = defaults?.formData || {};

    // Removal of elements with passed UUID for $id
    const id = uuid.split("_").pop();
    delete schemaDefinitions[`${id}`];
    delete schemaProperties[`${id}`];
    delete uiSchema[`${id}`];
    delete formData[`${id}`];

    const schema = {
      definitions: schemaDefinitions,
      type: "object",
      properties: schemaProperties,
    };

    return { schema, uiSchema, formData };
  };

  const deleteModule = useCallback(
    (uuid: string) => {
      const form = deleteSchemaModule(uuid, {
        schemaDefinitions: schema?.definitions,
        schemaProperties: schema?.properties,
        uiSchema: uiSchema,
        formData: formDataRef.current, // changed from "formData: formData" because it failed formData trace.
      });
      console.log("deleteModule form.formData:", form.formData);
      updateForm(form);
    },
    [schema, uiSchema, formData],
  );

  const toggleModule = useCallback((uuid: string, enabled: boolean) => {
    // console.log("toggleModule: ", uuid, "|", enabled);

    //TODO: Replace from split_pop, as it will conflict with new panel renaming feature
    //////////////////////////////////////////////////// New panel name means that the evaultaion of _ (which is from "root_") could be true, but not desired for removal (e.g. "a_panel_name")
    const id = uuid.split("_").pop();

    if (formDataRef.current) {
      const cloneFormData = { ...formDataRef.current };
      cloneFormData[`${id}`]["$enabled"] = enabled;
      setFormData(cloneFormData);
      // console.log("formDataRef", formDataRef.current);
      console.log("formData", cloneFormData);
    }
  }, []);

  const addModule = useCallback(
    (module: FlexBuilderTemplateModuleProps) => {
      //dataProcessing should be performed in the AddSchemaModule not in this module
      const form = addSchemaModule(module.id, module.schema, {
        schemaDefinitions: schema?.definitions,
        schemaProperties: schema?.properties,
        uiSchema: uiSchema,
        formData: formDataRef.current, // changed from "formData: formData" because it Failed formData trace.
      });
      // console.log(
      //   "addModule form.formData:",
      //   form.formData,
      //   " | New Form Data:",
      //   formDataRef.current,
      // );
      updateForm(form);
    },
    [schema, uiSchema, formData],
  );

  // Called by deleteModule() for processing schemas & formData
  const changeSchemaID = (panelName: string, defaults?: any): any => {
    const schemaDefinitions = defaults?.schemaDefinitions || {};
    const schemaProperties = defaults?.schemaProperties || {};

    const uiSchema = defaults?.uiSchema || {};
    const formData = defaults?.formData || {};

    // Removal of elements with passed UUID for $id
    // const id = panelName.split("_").pop();

    //if start of panel name is "root_", then reference with prefix excluded
    if (panelName.slice(0, 5) === "root_") {
      panelName = panelName.slice(5);
    }

    const newPanelName: string =
      prompt("Change the assigned name of this component.", panelName) ||
      panelName;

    // confirm new panel label doesn't already exist
    if (!isUndefined(schemaDefinitions[`${newPanelName}`])) {
      // notify the user the panel name is alre3ady declared and needs to be retried
      alert(
        "The name provided already exists. Please try again with a new value",
      );
      // Second definition is encasulated in the if structure and does not cause a dual-declaration conflict
      const schema = {
        definitions: schemaDefinitions,
        type: "object",
        properties: schemaProperties,
      };
      //Return unedited schema for no changes
      return { schema, uiSchema, formData };
    }

    // duplicate schemas with new panel label
    schemaDefinitions[`${newPanelName}`] = schemaDefinitions[`${panelName}`];
    schemaProperties[`${newPanelName}`] = schemaProperties[`${panelName}`];
    uiSchema[`${newPanelName}`] = uiSchema[`${panelName}`];
    formData[`${newPanelName}`] = formData[`${panelName}`];

    /* -- Moving this back to original call to resolve issue with originalId not updated in reference to data creating fault on removals--*/
    // remove previous panel definitions
    // delete schemaDefinitions[`${panelName}`];
    delete schemaProperties[`${panelName}`];
    delete uiSchema[`${panelName}`];
    delete formData[`${panelName}`];

    //creates failures

    const schema = {
      definitions: schemaDefinitions,
      type: "object",
      properties: schemaProperties,
    };

    return { schema, uiSchema, formData };
  };

  // Replicate an existing panel identification key with new name
  const changePanelName = useCallback((panelName: any) => {
    const form = changeSchemaID(panelName, {
      schemaDefinitions: schema?.definitions,
      schemaProperties: schema?.properties,
      uiSchema: uiSchema,
      formData: formDataRef.current, // changed from "formData: formData" because it failed formData trace.
    });
    console.log("changeSchemaID form.formData:", form.formData);
    updateForm(form);

    // const cleanedForm = deleteSchemaModule(panelName, {
    //   schemaDefinitions: schema?.definitions,
    //   schemaProperties: schema?.properties,
    //   uiSchema: uiSchema,
    //   formData: formDataRef.current, // changed from "formData: formData" because it failed formData trace.
    // });
    // updateForm(cleanedForm);
  }, []);

  return (
    <Form
      schema={schema as JSONSchema7}
      uiSchema={uiSchema}
      formData={formData}
      formContext={{
        toggleModule: toggleModule,
        deleteModule: deleteModule,
        changePanelName: changePanelName,
      }}
      onChange={({ formData }) => {
        if (!dirty && formDataRef.current) {
          setDirty(true);
        }
        formDataRef.current = formData; // Passed formData Trace
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
          <IconButton
            aria-label="Estimate gas cost"
            variant="outline"
            icon={<GasIcon boxSize={5} color="gray.500" />}
            onClick={() => {
              console.log("estimate Fees");
            }}
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
