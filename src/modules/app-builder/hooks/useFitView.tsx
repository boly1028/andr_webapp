import { useCallback } from "react";
import { FitView } from "reactflow";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";
import { useHotkeys } from "react-hotkeys-hook";
import { SHORTCUT_SCOPES } from "../shortcuts/scopes";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";

interface IUseFitViewProps { }

const useFitView = (props?: IUseFitViewProps) => {
    const { fitView } = useReactFlow()

    const handleFitView: FitView = useCallback((options) => {
        return fitView({
            maxZoom: 1,
            duration: 300,
            ...options
        })
    }, [fitView])

    return handleFitView
};
export const useFitViewShortcut = (enabled = true, description = 'Fit View') => {
    const fitView = useFitView();
    const { shortcutEnabled } = useAppBuilder()
    useHotkeys(APP_BUILDER_KEYCODES.FIT_VIEW, ()=>fitView(), {
        scopes: [SHORTCUT_SCOPES.CANVAS],
        enabled: shortcutEnabled && enabled,
        description: description,
        preventDefault: true
    })
}

export default useFitView;