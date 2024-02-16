import { useQuery } from "@tanstack/react-query";
import { getAdoList } from "../utils";
import { IAdoType } from "../types";

export const useGetSchemaMeta = (ado?: IAdoType) => {
    return useQuery(["schema", 'meta', ado], async () => {
        const data = await getSchemaMeta(ado!);
        return data;
    }, {
        enabled: !!ado
    });
};

/** Helper function to get the metadata for schema which contain class and classifier resolutions */
export const getSchemaMeta = async (ado: IAdoType) => {
    const classes = await getAdoList<Record<string, string>>('class');
    const classifiers = await getAdoList<Record<string, string>>('classifier');
    let _class = classes[ado] as string;
    let _classifier = classifiers[ado] as string;
    if (ado === 'app' || ado === 'app-contract') {
        _class = 'app';
        _classifier = 'app'
    }
    return {
        class: _class ?? '',
        classifier: _classifier ?? ""
    }
}