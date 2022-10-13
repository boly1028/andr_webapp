import { useQuery } from "@tanstack/react-query";
import { IAdoType } from "../types";
import { getADOPFromPath } from "../utils";

export const useGetSchemaADOP = (adoType: IAdoType, version = "0.1.0") => {
  return useQuery(["schema", adoType, version], async () => {
    const data = await getADOPFromPath(`${adoType}/${version}/ADOP`);
    return data;
  });
};
