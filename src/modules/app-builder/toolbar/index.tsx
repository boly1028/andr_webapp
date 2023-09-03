import { Box, ButtonGroup, HStack } from "@chakra-ui/react";
import React, { FC } from "react";
import AutoLayoutButton from "./AutoLayoutButton";
import DeleteButton from "./DeleteButton";
import FitViewButton from "./FitViewButton";
import ResetButton from "./ResetButton";
import ZoomButton from "./ZoomButton";

interface ToolbarProps {
}

const Toolbar: FC<ToolbarProps> = (props) => {
    const { } = props;

    return (
        <ButtonGroup bg='backgroundState.idle' borderRadius='lg' size='sm' isAttached>
            <ZoomButton offset={-0.1} />
            <ZoomButton offset={+0.1} />
            <FitViewButton />
            <AutoLayoutButton />
            {/* <LockButton /> */}
            <DeleteButton />
            <ResetButton />
        </ButtonGroup>
    );
};

export default Toolbar;