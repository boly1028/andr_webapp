import { useQuery } from "@tanstack/react-query";
import { IAdoType } from "../types";
import { getADOPFromPath, getADOVersion } from "../utils";

export const useGetSchemaADOP = (adoType: IAdoType, version = "latest") => {
  return useQuery(["schema", adoType, version], async () => {
    const data = await getADOPFromPath(`${adoType}/${version}/ADOP`);
    return data;
  });
};
