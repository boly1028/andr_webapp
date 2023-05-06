import { useCallback } from "react";
import { useReactFlow } from "reactflow"
import { useAppBuilder } from "../canvas/Provider";
import { useHotkeys } from "react-hotkeys-hook";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";
import { SHORTCUT_SCOPES } from "../shortcuts/scopes";

const useZoom = (offset: number) => {
    const { getZoom, zoomTo } = useReactFlow()

    const zoom = useCallback(() => {
        const zoom = getZoom();
        zoomTo(zoom + offset, {
            'duration': 300
        })
    }, [getZoom, zoomTo, offset])

    return { zoom, offset }
}

export const useZoomShortcut = (enabled = true, description = 'Zoom') => {
    const { zoom: zoomIn } = useZoom(+0.1);
    const { zoom: zoomOut } = useZoom(-0.1);
    const { shortcutEnabled } = useAppBuilder();

    useHotkeys(APP_BUILDER_KEYCODES.ZOOM_IN, () => zoomIn(), {
        scopes: [SHORTCUT_SCOPES.CANVAS],
        enabled: shortcutEnabled && enabled,
        description: description + ` in`,
        preventDefault: true
    })

    useHotkeys(APP_BUILDER_KEYCODES.ZOOM_OUT, () => zoomOut(), {
        scopes: [SHORTCUT_SCOPES.CANVAS],
        enabled: shortcutEnabled && enabled,
        description: description + ` out`,
        preventDefault: true
    })
}

export default useZoom;