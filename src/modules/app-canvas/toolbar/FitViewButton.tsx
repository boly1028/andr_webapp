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
        <Tooltip label={`Fit View`} bg='base.white' placement='top'>
            <IconButton
                color='newSystem.content.high'
                aria-label="Fit View"
                icon={<Icon as={Maximize} boxSize='4' />}
                variant='ghost'
                onClick={() => fitView()}
            />
        </Tooltip>
    );
};

export default FitViewButton;