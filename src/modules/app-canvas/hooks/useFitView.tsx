import { useCallback } from "react";
import { FitView } from "reactflow";
import { useReactFlow } from "../canvas/Provider";

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

export default useFitView;