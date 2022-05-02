import React, { FC, useState, useEffect } from "react";
import { Button, HStack, Flex } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";

import Form from "@rjsf/chakra-ui";

import widgets from "./widgets";
import FieldTemplate from "./FieldTemplate";
import TitleField from "./TitleField";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import ArrayFieldTemplate from "./ArrayFieldTemplate";

type FlexBuilderFormProps = {
  schema: JSONSchema7;
  uiSchema: any;
  formData?: any;
  isLoading?: boolean;
  onChange?: (data: any) => void;
  onSubmit?: (data: any) => void;
  onError?: () => void;
};

const FlexBuilderForm: FC<FlexBuilderFormProps> = ({
  schema,
  uiSchema,
  formData,
  onChange,
  onSubmit,
  onError,
  isLoading,
}) => {
  const [downloadText, setDownloadText] = useState(""); //Text link for exported file downloading

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
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={onChange}
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
