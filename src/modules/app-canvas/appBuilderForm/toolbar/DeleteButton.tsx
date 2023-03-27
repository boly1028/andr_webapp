import { TmpButton } from "@/theme/new-system-tmp/ui-elements";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import React, { FC } from "react";
import { useAppBuilder } from "../../canvas/Provider";

interface DeleteButtonProps {
    name: string;
}

const DeleteButton: FC<DeleteButtonProps> = (props) => {
    const { name } = props;
    const { deleteNode } = useAppBuilder()

    const handleDelete = () => {
        deleteNode(name)
    }
    return (
        <Tooltip label='Delete' bg='base.white' placement='top'>
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