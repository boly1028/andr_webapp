/**
 * Msg field (base64 field) widget. We fetch schema and create form component for the schema selected to
 * use as data for this field. Whenever formData changes for the inner schema, we create base64 for it
 * and add it to original schema field (debounce is used to boost performance)
 */

import { useGetSchemaJson } from "@/lib/schema/hooks";
import { useGetSchemaADOP } from "@/lib/schema/hooks/useGetSchemaADOP";
import { IAdoType } from "@/lib/schema/types";
import { BASE_ADOS, MODULES } from "@/lib/schema/utils/list";
import { ChevronDownIcon } from "@/modules/common";
import { WidgetProps } from "@andromedarjsf/utils";
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC, useState } from "react";
import Base from "./Base";


interface ExecuteMsgWidgetProps extends WidgetProps { }
export const ExecuteMsgWidget: FC<ExecuteMsgWidgetProps> = (props) => {

  const [currentBaseAdo, setCurrentBaseAdo] = useState<IAdoType>();
  const [currentSchema, setCurrentSchema] = useState<string>();
  const { data: adops } = useGetSchemaADOP(currentBaseAdo ?? 'app-contract')
  const { data: schemaFile } = useGetSchemaJson(currentSchema ?? "");

  return (
    <Base {...props}
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
              {currentBaseAdo ?? "Select Base Ado"}
              {/* </CustomMenuButton> */}
            </MenuButton>
            <MenuList maxH="48" overflow="auto">
              <MenuItem
                onClick={() => {
                  setCurrentSchema(undefined)
                  setCurrentBaseAdo(undefined);
                }}
                opacity='0.2'
              >
                Reset
              </MenuItem>
              {[...BASE_ADOS, ...MODULES].map((s) => (
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
            <MenuList maxH="48" overflow="auto">
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
        </Flex>
      )}
      formSchema={schemaFile}
    />
  );
};
