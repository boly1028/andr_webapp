import { useCallback } from "react"
import { Edge } from "reactflow"
import { IEdgeData } from "../canvas/Provider"

export interface ITimeoutEdgeData {
    edge: Edge<IEdgeData>, cb: () => void
}

export const useTimeoutEdgetUpdate = () => {
    const update = useCallback((cbs: ITimeoutEdgeData[]) => {
        cbs.reverse().forEach(({ edge, cb }, idx) => {
            const tId = setTimeout(() => {
                cb()
            }, idx * 200);
            // We need timeout of 200 between each onChange call because rjsf pools all the onChange and only execute the last one
            // TODO: Smart Pooling: Pool only onChange for a single node because different nodes are different rjsf instance and do not need pooling
            // TODO: Change execution to asyn await so that rename function will wait until all execution is complete
        })
    }, [])
    return update
}