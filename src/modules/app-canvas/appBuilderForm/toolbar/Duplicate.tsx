import { nextSuid, suid } from "@/lib/schema/utils";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Copy, Download, Trash } from "lucide-react";
import React, { FC } from "react";
import { useReactFlow } from "reactflow";
import { useAppBuilder } from "../../canvas/Provider";

interface DuplicateButtonProps {
    name: string;
}

const DuplicateButton: FC<DuplicateButtonProps> = (props) => {
    const { name } = props;
    const { formRefs, addNode, nodes } = useAppBuilder()
    const { getNode } = useReactFlow()

    const handleDuplicate = () => {
        const formRef = formRefs.current?.[name];
        const formData = formRef?.formData ?? {};
        const node = getNode(name);
        const schema = formRef?.andromedaSchema ?? {};
        let newName = suid()
        while (nodes.some(node => node.id === newName)) {
            newName = nextSuid(newName);
        }
        schema["form-data"] = formData;
        addNode(schema, newName, {
            ...node,
            id: newName,
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