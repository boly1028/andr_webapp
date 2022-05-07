import React, { FC, useState, useRef, useCallback } from "react";
import { Button, HStack, Flex } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";

import Form from "@rjsf/chakra-ui";

import widgets from "./widgets";
import FieldTemplate from "./FieldTemplate";
import TitleField from "./TitleField";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import ArrayFieldTemplate from "./ArrayFieldTemplate";

import { FlexBuilderTemplateProps } from "../types";
import useWarnIfUnsavedChanges from "../hooks/useWarnIfUnsavedChanges";

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
  const [dirty, setDirty] = useState(false);

  const [downloadText, setDownloadText] = useState(""); //Text link for exported file downloading

  const formDataRef = useRef(template.formData);

  useWarnIfUnsavedChanges(
    dirty,
    "Any configurations you have made will be lost.\nAre you sure that you want to leave?",
  );

  const updateForm = (form: any) => {
    setSchema(form.schema);
    setUiSchema(form.uiSchema);
    setFormData(form.formData);
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
    //const cloneFormData = { ...formData };
    //formDataRef.current[`${id}`]["$enabled"] = enabled;
    //setFormData(cloneFormData);
    if (formDataRef.current) {
      const cloneFormData = { ...formDataRef.current };
      cloneFormData[`${id}`]["$enabled"] = enabled;
      setFormData(cloneFormData);
    }
  }, []);

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

  const saveFlexTemplate = () => {
    //Concatenate schema, ui-schema, and form data into flexExport to be provided as a blob for download
    const flexExport: Record<string, any> = {};
    flexExport["schema"] = schema;
    flexExport["ui-schema"] = uiSchema;
    flexExport["formData"] = formData;
    console.log(flexExport);

    //Load data to be exported by the browser
    const flexBlob = new Blob([JSON.stringify(flexExport)], {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(flexBlob);
    //document.location.assign(url);
    //document.getElementById("flexDownload")!.href as HTMLAnchorElement} =
    const HTMLObj: HTMLAnchorElement = document.getElementById(
      "flexDownload",
    )! as HTMLAnchorElement;
    HTMLObj.href = url;
    setDownloadText("Download .Flex File");
  };

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
        formDataRef.current = formData;
      }}
      onSubmit={onSubmit}
      onError={onError}
      fields={{ TitleField }}
      FieldTemplate={FieldTemplate}
      ArrayFieldTemplate={ArrayFieldTemplate}
      ObjectFieldTemplate={ObjectFieldTemplate}
      widgets={{ ...widgets }}
    >
      <Flex my={16} justify="right">
        <HStack spacing={4}>
          <a id="flexDownload" download="template.flex" href="" target="_blank">
            {downloadText}
          </a>
          <Button
            variant="outline"
            onClick={() => {
              saveFlexTemplate();
            }}
          >
            Save as .Flex
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              console.log("estimate Fees");
            }}
          >
            Estimate Fees
          </Button>
          <Button type="submit" colorScheme="purple" isLoading={isLoading}>
            Publish
          </Button>
        </HStack>
      </Flex>
    </Form>
  );
};

export default FlexBuilderForm;
