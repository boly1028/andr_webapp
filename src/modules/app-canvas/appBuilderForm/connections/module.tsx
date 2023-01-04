import { MutableRefObject, useCallback, useEffect, useMemo } from "react"
import { useReactFlow } from "../../canvas/Provider"
import { IFieldRef } from "../templates/FieldTemplate"
import { debounce } from 'lodash'

export const useIsModule = (schema: any, formData: any, ref: MutableRefObject<IFieldRef>) => {
    const { getNode } = useReactFlow()

    const isModule = useMemo(() => {
        return !!schema?.properties?.module_type
    }, [schema])

    const identifierValue: string = useMemo(() => {
        return formData?.address?.identifier ?? ''
    }, [formData])


    const update = useCallback((identifier: string) => {
        const targetNode = getNode(identifier)
        if (targetNode) {
            console.log("Module Update", identifier, formData)
            ref.current.onChange?.({
                ...formData,
                module_type: targetNode.data.andromedaSchema.schema.$id
            })
        }
    }, [getNode, formData, ref])


    useEffect(() => {
        if (isModule) {
            const tId = setTimeout(() => {
                update(identifierValue)
            }, 500)
            return () => clearTimeout(tId)
        }
    }, [identifierValue, isModule])

    return { isModule }
}