/**
 * Msg field (base64 field) widget. We fetch schema and create form component for the schema selected to
 * use as data for this field. Whenever formData changes for the inner schema, we create base64 for it
 * and add it to original schema field (debounce is used to boost performance)
 */
import { useGetSchemaJson } from "@/lib/schema/hooks";
import { IAdoType, IImportantAdoKeys } from "@/lib/schema/types";
import { ChevronDownIcon } from "@/modules/common";
import { WidgetProps } from "@andromedarjsf/utils";
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC, useState } from "react";
import Base from "./Base";
import { InstantiateMsgWidget } from "./InstantiateMsgWidget";

interface BinaryMsgWidgetProps extends WidgetProps { }
export const BinaryMsgWidget: FC<BinaryMsgWidgetProps> = (props) => {

    const [currentBaseAdo, setCurrentBaseAdo] = useState<{ ado: IAdoType, label: string }>();
    const [currentSchema, setCurrentSchema] = useState<string>();
    const { data: schemaFile } = useGetSchemaJson(currentSchema ?? "");

    if (props.id.endsWith('instantiate_msg')) return (
        <InstantiateMsgWidget {...props} />
    )

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
                            {currentBaseAdo?.label ?? "Base64"}
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
                                Base 64
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setCurrentBaseAdo({
                                        ado: "" as any,
                                        "label": "JSON"
                                    })
                                    setCurrentSchema(IImportantAdoKeys.JSON_SCHEMA.path)
                                }}
                            >
                                JSON
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            )}
            formSchema={schemaFile}
        />
    );
};
