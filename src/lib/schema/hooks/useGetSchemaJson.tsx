import { getSchemaFromPath } from "@/api/schema";
import { useQuery } from "react-query";

export const useGetSchemaJson = <T,>(path: string) => {
  return useQuery(["schema", path], async () => {
    const data: T = await getSchemaFromPath({ path });
    return data;
  });
};
