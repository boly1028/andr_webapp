import { QueryResult, useQuery, gql } from "@apollo/client";
import { ICodegenGeneratedAdoPrimitiveGetvalueQuery, useCodegenGeneratedAdoPrimitiveGetvalueQuery } from "@andromedaprotocol/gql/dist/__generated/react"

export interface ReturnValue
    extends Pick<QueryResult, "loading" | "error"> {
    data?: ICodegenGeneratedAdoPrimitiveGetvalueQuery['ADO']['primitive']['getValue'];
}

export function useGetPrimitiveValue(address: string, key = 'default'): ReturnValue {
    const { data, loading, error } = useCodegenGeneratedAdoPrimitiveGetvalueQuery({
        variables: {
            'ADO_primitive_address': address,
            'ADO_primitive_primitive_getValue_key': key
        }
    });
    return {
        loading,
        error,
        data: data?.ADO.primitive?.getValue
    }
}