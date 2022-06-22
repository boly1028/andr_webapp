import React, { FC, useState, useRef, useCallback } from "react";
import { Button, HStack, Flex, IconButton } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import Form from "@rjsf/chakra-ui";
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
  const [formData, setFormData] = useState(template.formData); //Initial formData declaration
  const [dirty, setDirty] = useState(false);

  const formDataRef = useRef(template.formData);

  /**
  useWarnIfUnsavedChanges(
    dirty,
    "Any configurations you have made will be lost.\nAre you sure that you want to leave?",
  );
  **/

  const updateForm = (form: any) => {
    setSchema(form.schema);
    setUiSchema(form.uiSchema);
    //setFormData(form.formData);
    //Failed formData trace
    setFormData(formDataRef.current); //Load stored value for data passing
    // alert(JSON.stringify(formData));
    // console.log("Form formData --------------------------------------------");
    // console.log(form.formData);
    // console.log(form);
    // console.log(formData);
  };

  const addSchemaModule = (
    uuid: string | undefined,
    data: any,
    defaults?: any,
  ): any => {
    const schemaDefinitions = defaults?.schemaDefinitions || {};
    const schemaProperties = defaults?.schemaProperties || {};

    // Failed formData trace
    // console.log("data", data);

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
    formData[`${uuid}`] = data["form-data"];
    // Failed formData trace
    // console.log("fdata[form-data]");
    // console.log(data);
    // console.log(data["form-data"]);

    const schema = {
      definitions: schemaDefinitions,
      type: "object",
      properties: schemaProperties,
    };

    return { schema, uiSchema, formData };
  };

  const deleteSchemaModule = (uuid: string, defaults?: any): any => {
    const schemaDefinitions = defaults?.schemaDefinitions || {};
    const schemaProperties = defaults?.schemaProperties || {};

    const uiSchema = defaults?.uiSchema || {};
    const formData = defaults?.formData || {};

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

  const toggleModule = useCallback((uuid: string, enabled: boolean) => {
    const id = uuid.split("_").pop();
    if (formDataRef.current) {
      const cloneFormData = { ...formDataRef.current };
      cloneFormData[`${id}`]["$enabled"] = enabled;
      setFormData(cloneFormData);
    }
  }, []);

  const addModule = useCallback(
    (module: FlexBuilderTemplateModuleProps) => {
      const form = addSchemaModule(module.id, module.schema, {
        schemaDefinitions: schema?.definitions,
        schemaProperties: schema?.properties,
        uiSchema: uiSchema,
        formData: formData,
        // Failed formData trace
      });

      updateForm(form);
    },
    [schema, uiSchema, formData],
  );

  const deleteModule = useCallback(
    (uuid: string) => {
      const form = deleteSchemaModule(uuid, {
        schemaDefinitions: schema?.definitions,
        schemaProperties: schema?.properties,
        uiSchema: uiSchema,
        formData: formData,
      });

      updateForm(form);
    },
    [schema, uiSchema, formData],
  );

  return (
    <Form
      schema={schema as JSONSchema7}
      uiSchema={uiSchema}
      formData={formData}
      formContext={{
        toggleModule: toggleModule,
        deleteModule: deleteModule,
      }}
      onChange={({ formData }) => {
        if (!dirty && formDataRef.current) {
          setDirty(true);
        }
        formDataRef.current = formData; // Passed formData Trace
        // console.log(JSON.stringify(formData));
        // console.log(JSON.stringify(formDataRef));
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
