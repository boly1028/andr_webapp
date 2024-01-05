import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Maximize } from "lucide-react";
import React, { FC } from "react";
import useFitView from "../hooks/useFitView";

interface FitViewButtonProps {
}

const FitViewButton: FC<FitViewButtonProps> = (props) => {
    const { } = props;
    const fitView = useFitView()
    return (
        <Tooltip label={`Fit View`} placement='top'>
            <IconButton
                aria-label="Fit View"
                icon={<Icon as={Maximize} boxSize='4' />}
                variant="theme-ghost"
                onClick={() => fitView()}
            />
        </Tooltip>
    );
};

export default FitViewButton;