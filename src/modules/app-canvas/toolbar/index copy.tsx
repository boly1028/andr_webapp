import { Box, ButtonGroup, HStack } from "@chakra-ui/react";
import React, { FC } from "react";
import DeleteButton from "./DeleteButton";
import FitViewButton from "./FitViewButton";
import LockButton from "./LockButton";
import ZoomButton from "./ZoomButton";

interface ToolbarProps {
}

const Toolbar: FC<ToolbarProps> = (props) => {
    const { } = props;

    return (
        <ButtonGroup bg='newSystem.backgroundState.idle' borderRadius='lg' spacing='0' size='sm'>
            <ZoomButton offset={-0.1} />
            <ZoomButton offset={+0.1} />
            <FitViewButton />
            {/* <LockButton /> */}
            <DeleteButton />
        </ButtonGroup>
    );
};

export default Toolbar;