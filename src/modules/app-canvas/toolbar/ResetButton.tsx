import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Eraser } from "lucide-react";
import React, { FC } from "react";
import { useNodes } from "reactflow";
import useResetCanvas from "../hooks/useResetCanvas";

interface ResetButtonProps {
}

const ResetButton: FC<ResetButtonProps> = (props) => {
    const { } = props;
    const reset = useResetCanvas()
    const nodes = useNodes()

    const handleReset = () => {
        reset()
    }
    return (
        <Tooltip label={`Delete All`} placement='top'>
            <IconButton
                isDisabled={nodes.length === 0}
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