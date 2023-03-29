import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Maximize } from "lucide-react";
import React, { FC } from "react";
import { useReactFlow } from "../canvas/Provider";

interface FitViewButtonProps {
}

const FitViewButton: FC<FitViewButtonProps> = (props) => {
    const { } = props;
    const { fitView } = useReactFlow()

    const handleFitView = () => {
        fitView({
            maxZoom: 1,
            duration: 300
        })
    }
    return (
        <Tooltip label={`Fit View`} bg='base.white' placement='top'>
            <IconButton
                color='newSystem.content.high'
                aria-label="Fit View"
                icon={<Icon as={Maximize} boxSize='4' />}
                variant='ghost'
                onClick={handleFitView}
            />
        </Tooltip>
    );
};

export default FitViewButton;