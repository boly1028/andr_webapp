import { useQuery } from "@tanstack/react-query";
import { IAdoType } from "../types";
import { getADOVersion } from "../utils";

export const useGetSchemaVersions = (adoType: IAdoType) => {
    return useQuery(["schema", adoType], async () => {
        const adoVersion = await getADOVersion(adoType);
        return adoVersion;
    });
};
