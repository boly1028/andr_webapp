import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { ZoomIn, ZoomOut } from "lucide-react";
import React, { FC } from "react";
import useZoom from "../hooks/useZoom";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";

interface ZoomButtonProps {
    offset: number
}

const ZoomButton: FC<ZoomButtonProps> = (props) => {
    const { offset } = props;
    const { zoom, offset: zoomOffset } = useZoom(offset)
    return (
        <Tooltip label={`Zoom(${zoomOffset < 0 ? APP_BUILDER_KEYCODES.ZOOM_OUT : APP_BUILDER_KEYCODES.ZOOM_IN})`} placement='top'>
            <IconButton
                aria-label="Zoom"
                icon={<Icon as={zoomOffset < 0 ? ZoomOut : ZoomIn} boxSize='4' />}
                variant="theme-ghost"
                onClick={zoom}
            />
        </Tooltip>
    );
};

export default ZoomButton;