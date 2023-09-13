/**
 * Msg field (base64 field) widget. We fetch schema and create form component for the schema selected to
 * use as data for this field. Whenever formData changes for the inner schema, we create base64 for it
 * and add it to original schema field (debounce is used to boost performance)
 */
import { useGetSchemaJson } from "@/lib/schema/hooks";
import { useGetSchemaADOP } from "@/lib/schema/hooks/useGetSchemaADOP";
import { IAdoType } from "@/lib/schema/types";
import { BASE_ADOS, MODULES, RECEIVES } from "@/lib/schema/utils/list";
import { ChevronDownIcon } from "@/modules/common";
import { WidgetProps } from "@andromedarjsf/utils";
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC, useState } from "react";
import Base from "./Base";

interface Cw721ReceiveMsgWidgetProps extends WidgetProps { }
export const Cw721ReceiveMsgWidget: FC<Cw721ReceiveMsgWidgetProps> = (props) => {

  const [currentBaseAdo, setCurrentBaseAdo] = useState<{ ado: IAdoType, label: string }>();
  const [currentSchema, setCurrentSchema] = useState<string>();
  const { data: adops } = useGetSchemaADOP(currentBaseAdo?.ado ?? 'app-contract')
  const { data: schemaFile } = useGetSchemaJson(currentSchema ?? "");

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
              {currentBaseAdo?.label ?? "Custom Message"}
              {/* </CustomMenuButton> */}
            </MenuButton>
            <MenuList maxH="48" overflow="auto">
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
                  reset();
                }}
              >
                Custom Message
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCurrentBaseAdo({
                    ado: "" as any,
                    "label": "JSON"
                  })
                  setCurrentSchema('json')
                }}
              >
                JSON
              </MenuItem>
              {[...BASE_ADOS, ...MODULES].filter(ado => RECEIVES.some(rAdo => rAdo.source.split('/')[0] === ado.$id)).map((s) => (
                <MenuItem
                  key={s.source}
                  onClick={() => {
                    if (s.$id !== currentBaseAdo?.ado) {
                      setCurrentSchema(undefined)
                    }
                    setCurrentBaseAdo({ ado: s.$id as any, label: s.title });
                  }}
                >
                  {s.title}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {currentBaseAdo && adops && (
            <Menu placement="bottom-start">
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                alignSelf="start"
                minW='max-content'
                colorScheme='gray'
                isDisabled={!currentBaseAdo}
              >
                {/* <CustomMenuButton> */}
                {schemaFile?.schema?.title ?? "Select Message"}
                {/* </CustomMenuButton> */}
              </MenuButton>
              <MenuList maxH="48" overflow="auto">
                {adops?.cw721receives?.map((s) => (
                  <MenuItem
                    key={s}
                    onClick={() => {
                      const path = `${adops.basePath}/${s}`
                      setCurrentSchema(path);
                    }}
                  >
                    {s.replace('.receive', '')}
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
