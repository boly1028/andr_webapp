import { useGetSchemaJson } from "@/lib/schema/hooks";
import { ALL_SCHEMA } from "@/lib/schema/utils/list";
import { CustomMenuButton } from "@/modules/common";
import {
  Box,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Form from "@rjsf/chakra-ui";
import { WidgetProps } from "@rjsf/core";
import widgets from ".";
import {
  FieldTemplate,
  TitleField,
  DescriptionField,
  ObjectFieldTemplate,
  ArrayFieldTemplate,
} from "../templates";

import React, { FC, useEffect, useState } from "react";

interface MsgWidgetProps extends WidgetProps {}
export const MsgWidget: FC<MsgWidgetProps> = (props) => {
  const { id, uiSchema, schema, onFocus, onBlur, value, onChange } = props;

  const [currentSchema, setCurrentSchema] = useState<string>();
  const { data: schemaFile } = useGetSchemaJson(currentSchema ?? "");
  const [formData, setFormData] = useState<any>();

  useEffect(() => {
    const tId = setTimeout(() => {
      if (formData) {
        onChange(btoa(JSON.stringify(formData)));
      }
    }, 100);
    return () => clearTimeout(tId);
  }, [formData]);

  return (
    <Box
      id={id}
      onFocus={() => {
        onFocus(id, value);
      }}
      onBlur={() => {
        onBlur(id, value);
      }}
    >
      <Input
        value={value}
        isRequired={props.required}
        isInvalid={!!props.rawErrors}
        aria-label={props.label}
        placeholder={props.placeholder || "Base64 message"}
        readOnly
        disabled
      />
      <Flex direction="row" gap="4" mt="4">
        <Menu placement="bottom-start">
          <MenuButton alignSelf="start">
            <CustomMenuButton>
              {schemaFile?.schema?.title ?? "Select Schema"}
            </CustomMenuButton>
          </MenuButton>
          <MenuList maxH="48" overflow="auto">
            {ALL_SCHEMA.map((s) => (
              <MenuItem
                key={s.source}
                onClick={() => {
                  setCurrentSchema(s.source);
                }}
              >
                {s.$id}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Box w="full">
          {schemaFile?.schema && (
            <Form
              schema={schemaFile?.schema}
              uiSchema={schemaFile?.["ui-schema"]}
              formData={formData}
              formContext={{
                schema,
              }}
              onChange={({ formData: _formData }) => {
                setFormData(_formData);
              }}
              fields={{ TitleField, DescriptionField }}
              FieldTemplate={FieldTemplate}
              ArrayFieldTemplate={ArrayFieldTemplate}
              ObjectFieldTemplate={ObjectFieldTemplate as any}
              widgets={{ ...widgets }}
            >
              {/* Pass fragment to hide submit button */}
              <></>
            </Form>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
