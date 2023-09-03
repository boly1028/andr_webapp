import { cloneDeep } from "@apollo/client/utilities";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Copy, Download, Trash } from "lucide-react";
import React, { FC } from "react";
import { useReactFlow } from "reactflow";
import { useAppBuilder } from "../../canvas/Provider";
import useAddNode from "../../hooks/useAddNode";

interface DuplicateButtonProps {
    name: string;
}

const DuplicateButton: FC<DuplicateButtonProps> = (props) => {
    const { name } = props;
    const { formRefs } = useAppBuilder()
    const { getNode, getNodes } = useReactFlow()
    const addNode = useAddNode()

    const handleDuplicate = () => {
        const formRef = formRefs.current?.[name];
        const formData = cloneDeep(formRef?.formData ?? {});
        const node = cloneDeep(getNode(name));
        const schema = cloneDeep(node?.data.andromedaSchema ?? {});
        schema["form-data"] = formData;
        addNode(schema, {
            ...node,
            id: undefined,
            position: undefined,
            selected: false
        })
    };

    return (
        <Tooltip label='Duplicate' placement='top'>
            <IconButton
                aria-label="duplicate"
                icon={<Icon as={Copy} boxSize='4' />}
                variant='ghost'
                onClick={handleDuplicate}
            />
        </Tooltip>
    );
};

export default DuplicateButton;