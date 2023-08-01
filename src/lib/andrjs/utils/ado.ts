import { IAdoType } from "@/lib/schema/types";

export const getAdoTypeWithVersion = (ado: string, version: string) => `${ado}@${version}`;