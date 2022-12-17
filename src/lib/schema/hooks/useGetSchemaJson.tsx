import { useQuery } from "@tanstack/react-query";
import { getADOVersion, getSchemaFromPath } from "../utils";

export const useGetSchemaJson = (path: string) => {
  return useQuery(["schema", path], async () => {
    const data = await getSchemaFromPath(path);
    return data;
  });
};
