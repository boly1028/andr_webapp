import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import React, { FC } from "react";
import useDeleteNode from "../../hooks/useDeleteNode";

interface DeleteButtonProps {
    name: string;
}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
    const { name } = props;
    const deleteNode = useDeleteNode()

    const handleDelete = () => {
        deleteNode([name])
    }
    return (
        <Tooltip label='Delete' placement='top'>
            <IconButton
                aria-label="delete"
                icon={<Icon as={Trash} boxSize='4' />}
                variant='ghost'
                onClick={handleDelete}
            />
        </Tooltip>
    );
};

export default DeleteButton;