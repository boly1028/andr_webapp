import { FC, useCallback, useEffect, useMemo } from "react";
import { useFieldTemplate } from "../templates/FieldTemplate";
import { useReactFlow } from "../../canvas/Provider";


interface WrapIfModuleProps {
    id:string;
    formData: { address: { identifier: string }; module_type: string };
}

export const WrapIfModule: FC<WrapIfModuleProps> = (props) => {
    const { formData, id } = props;
    const { getNode } = useReactFlow()
    const { fieldRef } = useFieldTemplate()

    const isModule = useMemo(() => {
        return id.split('_').pop() === 'module_type'
    }, [id])

    const identifierValue: string = useMemo(() => {
        return formData?.address?.identifier ?? ''
    }, [formData?.address?.identifier])

    const update = useCallback((identifier: string) => {
        const targetNode = getNode(identifier)
        if (targetNode) {
            console.log("Module Update", identifier, formData)
            fieldRef.current.onChange?.({
                ...formData,
                module_type: targetNode.data.andromedaSchema.schema.$id
            })
        }
    }, [getNode, formData, fieldRef])

    useEffect(() => {
        if (isModule) {
            const tId = setTimeout(() => {
                update(identifierValue)
            }, 1000)
            return () => clearTimeout(tId)
        }
    }, [identifierValue, isModule])

    return null;
}