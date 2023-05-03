import { INSTANTIATE_CLI_QUERY, useCodeId } from "@/lib/andrjs";
import { useCallback } from "react";
import { usePublish } from "./usePublish";

interface IUseCopyCliProps { }

const useCopyCli = (props?: IUseCopyCliProps) => {
    const { getMsg } = usePublish()
    const codeId = useCodeId("app");


    const instantiation = useCallback(() => {
        const msg = getMsg()
        const query = INSTANTIATE_CLI_QUERY({
            msg: msg ?? {},
            codeId: codeId
        })
        console.log(query)
        return query
    }, [getMsg, codeId])

    return { instantiation }
}
export default useCopyCli;