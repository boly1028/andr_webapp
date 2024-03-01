import { useQuery } from "@tanstack/react-query";
import { IAdoType } from "../types";
import { getADOVersion, getADOVersionFromCodeId } from "../utils";

export const useGetSchemaVersions = (adoType: IAdoType) => {
    return useQuery(["schema", adoType], async () => {
        const adoVersion = await getADOVersion(adoType);
        return adoVersion;
    });
};


export const useGetSchemaVersionFromCodeId = (codeId: number, chainId: string) => {
    return useQuery(["schema", "codeId", codeId, chainId], async () => {
        const adoVersion = await getADOVersionFromCodeId(codeId, chainId);
        return adoVersion;
    });
};
