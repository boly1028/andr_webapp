import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import React, { FC } from "react";
import { useReactFlow } from "../canvas/Provider";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";
import useDeleteNode from "../hooks/useDeleteNode";

interface DeleteButtonProps {
}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
    const { } = props;
    const deleteNode = useDeleteNode()
    const { getNodes } = useReactFlow()

    const handleDelete = () => {
        const selectedNodes = getNodes().filter(node => node.selected).map(node => node.id)
        deleteNode(selectedNodes)
    }
    return (
        <Tooltip label={`Delete(${APP_BUILDER_KEYCODES.DELETE})`} bg='base.white' placement='top'>
            <IconButton
                aria-label="delete"
                icon={<Icon as={Trash} boxSize='4' />}
                variant='ghost'
                onClick={handleDelete}
                color='newSystem.danger.500'
            />
        </Tooltip>
    );
};

export default DeleteButton;