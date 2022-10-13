import { useQuery } from "@tanstack/react-query";
import { getSchemaFromPath } from "../utils";

export const useGetSchemaJson = (path: string) => {
  return useQuery(["schema", path], async () => {
    const data = await getSchemaFromPath(path);
    return data;
  });
};
