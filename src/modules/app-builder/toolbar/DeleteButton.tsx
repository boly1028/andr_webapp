import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import React, { FC, useMemo } from "react";
import { useNodes } from "reactflow";
import { useReactFlow } from "../canvas/Provider";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";
import useDeleteNode from "../hooks/useDeleteNode";


interface DeleteButtonProps {
}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
    const { } = props;
    const deleteNode = useDeleteNode()
    const nodes = useNodes()
    const selectedNodesIds = useMemo(() => {
        return nodes.filter(node => node.selected).map(node => node.id)
    }, [nodes])

    const handleDelete = () => {
        deleteNode(selectedNodesIds)
    }
    return (
        <Tooltip label={`Delete(${APP_BUILDER_KEYCODES.DELETE})`} placement='top'>
            <IconButton
                isDisabled={selectedNodesIds.length === 0}
                aria-label="delete"
                icon={<Icon as={Trash} boxSize='4' />}
                variant="theme-destructive"
                onClick={handleDelete}
            />
        </Tooltip>
    );
};

export default DeleteButton;