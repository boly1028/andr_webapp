import { FC, useCallback, useEffect, useMemo } from "react";
import { useFieldTemplate } from "../templates/FieldTemplate";
import { useReactFlow } from "../../canvas/Provider";
import { RJSFSchema } from "@andromedarjsf/utils";

interface WrapIfModuleProps {
    schema: RJSFSchema;
    formData: { address: { identifier: string }; module_type: string };
}

export const WrapIfModule: FC<WrapIfModuleProps> = (props) => {
    const { formData, schema } = props;
    const { getNode } = useReactFlow()
    const { fieldRef } = useFieldTemplate()

    const isModule = useMemo(() => {
        return !!schema?.properties?.module_type && !!schema.properties?.address;
    }, [schema?.properties])

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