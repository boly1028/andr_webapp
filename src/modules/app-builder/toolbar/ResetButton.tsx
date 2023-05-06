import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Eraser } from "lucide-react";
import React, { FC } from "react";
import { useNodes } from "reactflow";
import useResetCanvas from "../hooks/useResetCanvas";
import useConfirmationModal from "@/modules/modals/hooks/useConfirmationModal";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";

interface ResetButtonProps {
}

const ResetButton: FC<ResetButtonProps> = (props) => {
    const { } = props;
    const {reset, disabled} = useResetCanvas()
    const handleReset = () => {
        reset()
    }
    return (
        <Tooltip label={`Delete All(${APP_BUILDER_KEYCODES.RESET})`} placement='top'>
            <IconButton
                isDisabled={disabled}
                aria-label="delete all"
                icon={<Icon as={Eraser} boxSize='4' />}
                variant='ghost'
                onClick={handleReset}
                color='newSystem.danger.500'
            />
        </Tooltip>
    );
};

export default ResetButton;