import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Network } from "lucide-react";
import React, { FC } from "react";
import { useReactFlow } from "reactflow";
import useAutoLayout from "../hooks/useAutolayout";

interface AutoLayoutButtonProps {
}

const AutoLayoutButton: FC<AutoLayoutButtonProps> = (props) => {
    const { } = props;
    const autoLayout = useAutoLayout()
    const { fitView } = useReactFlow()
    const handleAutoLayout = () => {
        autoLayout()
        setTimeout(() => {
            fitView({
                duration: 300
            })
        }, 300)
    }
    return (
        <Tooltip label={`Auto Layout`} placement='top'>
            <IconButton
                aria-label="Auto Layout"
                icon={<Icon as={Network} boxSize='4' />}
                variant="theme-ghost"
                onClick={handleAutoLayout}
            />
        </Tooltip>
    );
};

export default AutoLayoutButton;