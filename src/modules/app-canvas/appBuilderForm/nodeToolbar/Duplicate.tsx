import { nextSuid, suid } from "@/lib/schema/utils";
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
        let newName = suid()
        const nodes = getNodes()
        while (nodes.some(node => node.id === newName)) {
            newName = nextSuid(newName);
        }
        console.log(formData, name)
        schema["form-data"] = formData;
        addNode(schema, newName, {
            ...node,
            id: newName,
            position: undefined,
            selected: false
        })
    };

    return (
        <Tooltip label='Duplicate' bg='base.white' placement='top'>
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