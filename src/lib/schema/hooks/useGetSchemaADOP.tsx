import { useQuery } from "@tanstack/react-query";
import { IAdoType } from "../types";
import { getADOPFromPath, getADOVersion } from "../utils";

export const useGetSchemaADOP = (adoType: IAdoType, version = "latest") => {
  return useQuery(["schema", adoType, version], async () => {
    const basePath = `${adoType}/${version}`
    const data = await getADOPFromPath(`${basePath}/ADOP`);
    return {
      ...data,
      basePath: basePath
    };
  }, {
    refetchOnWindowFocus: false
  });
};
