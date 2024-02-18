import { useQuery } from "@tanstack/react-query";
import { getAdoList } from "../utils";
import { IAdoList } from "../types/templates";

export const useGetAdoList = <T=IAdoList>(item: ADO_LIST_FILES) => {
  return useQuery(["schema", "list", item], async () => {
    const data = await getAdoList<T>(item);
    return data;
  });
};

export const useGetAdoEnabled = () => {
  const { data: adoEnabled = {} } = useGetAdoList<Record<string, boolean>>('adoEnable' as any);
  return adoEnabled;
}

export const useGetFilteredAdoList = (item: ADO_LIST_FILES) => {
  const adoEnabled = useGetAdoEnabled();
  return useQuery(["schema", "list", "filtered", item, adoEnabled], async () => {
    const data = await getAdoList<IAdoList>(item);
    return data.filter(ado => adoEnabled[ado.adoType]);
  });
};

export const useGetFilteredAllAdoList = () => {
  const { data: ALL_ADO = [] } = useGetFilteredAdoList(ADO_LIST_FILES.ALL_ADO);
  return useQuery(["schema", "list", "filtered", "fixed", "ALL_ADO", ALL_ADO], async () => {
    return [...ALL_ADO].sort((a, b) => a.$id > b.$id ? 1 : -1);
  });
};

export enum ADO_LIST_FILES {
  BASE_ADO = 'baseADO',
  ALL_ADO = 'allADO',
  MODIFIER = 'modifier',
  MODULE = 'module',
  OS = 'os',
  PRIMITIVE = 'primitive',
  QUERY = 'query',
  RECEIVE = 'receive',
  RESPONSE = 'response'
}