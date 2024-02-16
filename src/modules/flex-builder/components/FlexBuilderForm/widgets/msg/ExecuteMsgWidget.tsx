/**
 * Msg field (base64 field) widget. We fetch schema and create form component for the schema selected to
 * use as data for this field. Whenever formData changes for the inner schema, we create base64 for it
 * and add it to original schema field (debounce is used to boost performance)
 */

import { useGetSchemaJson } from "@/lib/schema/hooks";
import { useGetSchemaADOP } from "@/lib/schema/hooks/useGetSchemaADOP";
import { IAdoType, IImportantAdoKeys } from "@/lib/schema/types";
import { ChevronDownIcon } from "@/modules/common";
import { WidgetProps } from "@andromedarjsf/utils";
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC, useState } from "react";
import Base from "./Base";
import { ADO_LIST_FILES, useGetAdoList, useGetFilteredAllAdoList } from "@/lib/schema/hooks/useGetAdoList";


interface ExecuteMsgWidgetProps extends WidgetProps { }
export const ExecuteMsgWidget: FC<ExecuteMsgWidgetProps> = (props) => {

  const [currentBaseAdo, setCurrentBaseAdo] = useState<IAdoType>();
  const [currentSchema, setCurrentSchema] = useState<string>();
  const { data: adops } = useGetSchemaADOP(currentBaseAdo ?? 'app-contract')
  const { data: schemaFile } = useGetSchemaJson(currentSchema ?? "");
  const { data: MASTER_ALLADO = [] } = useGetAdoList(ADO_LIST_FILES.ALL_ADO);
  const { data: ALL_ADOS = [] } = useGetFilteredAllAdoList();

  const reset = () => {
    setCurrentSchema(undefined)
    setCurrentBaseAdo(undefined);
  }

  return (
    <Base {...props}
      reset={reset}
      selectWidget={(
        <Flex direction="row" gap="4">
          <Menu placement="bottom-start">
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              alignSelf="start"
              minW='max-content'
            >
              {/* <CustomMenuButton> */}
              {currentBaseAdo ?? "Custom Msg"}
              {/* </CustomMenuButton> */}
            </MenuButton>
            <MenuList maxH="max(50vh,20rem)" overflow="auto">
              <MenuItem
                onClick={() => {
                  reset()
                  props.onChange('')
                }}
                opacity='0.2'
              >
                Reset
              </MenuItem>
              <MenuItem
                onClick={() => {
                  reset()
                }}
              >
                Custom Msg
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCurrentBaseAdo("Json" as any)
                  setCurrentSchema(IImportantAdoKeys.JSON_SCHEMA.path)
                }}
              >
                JSON
              </MenuItem>
              {[...(props.formContext?.admin ? MASTER_ALLADO : ALL_ADOS)].map((s) => (
                <MenuItem
                  key={s.source}
                  onClick={() => {
                    if (s.$id !== currentBaseAdo) {
                      setCurrentSchema(undefined)
                    }
                    setCurrentBaseAdo(s.$id as any);
                  }}
                >
                  {s.$id}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {(currentBaseAdo && adops) && (
            <Menu placement="bottom-start">
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                alignSelf="start"
                minW='max-content'
              >
                {/* <CustomMenuButton> */}
                {schemaFile?.schema?.title ?? "Select Modifier"}
                {/* </CustomMenuButton> */}
              </MenuButton>
              <MenuList maxH="max(50vh,20rem)" overflow="auto">
                {adops?.modifiers.map((s) => (
                  <MenuItem
                    key={s}
                    onClick={() => {
                      const path = `${adops.basePath}/${s}`
                      setCurrentSchema(path);
                    }}
                  >
                    {s}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
        </Flex>
      )}
      formSchema={schemaFile}
    />
  );
};
