import { useCallback } from "react";
import { XYPosition } from "reactflow";
import { useReactFlow } from "../canvas/Provider";

interface IUseGetWrapperProps { }

export const WRAPPER_ID = 'react-flow-wrapper';

const useGetWrapper = (props?: IUseGetWrapperProps) => {
    const { project } = useReactFlow()
    const getWrapper = useCallback(() => {
        const elem = document.getElementById(WRAPPER_ID)
        return elem
    }, [])

    const getUpdatedPosition = useCallback((xy: XYPosition) => {
        const pos = getWrapper()?.getBoundingClientRect();
        if (pos) {
            xy.x = xy.x - pos.left;
            xy.y = xy.y - pos.top;
        }
        return project(xy);
    }, [getWrapper, project])

    const getCenterPosition = useCallback(() => {
        const offset = (Math.random() - 0.5 > 0 ? 1 : -1) * Math.ceil(Math.random() * 100);
        const pos = getWrapper()?.getBoundingClientRect();
        const top = pos?.top || 0;
        const height = pos?.height || 0;
        const left = pos?.left || 0;
        const width = pos?.width || 0;
        return getUpdatedPosition({
            x: left + width / 2 - offset,
            y: top + height / 2 - offset + 50,
        });
    }, [getWrapper, getUpdatedPosition])

    return { getWrapper, getUpdatedPosition, getCenterPosition }
};

export default useGetWrapper;