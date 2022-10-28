import { IAdoType } from "../types";
import classes from '../schema/class.json'
import classifiers from '../schema/classifier.json'

export const getSchemaMeta = (ado: IAdoType) => {
    let _class = classes[ado] as string;
    let _classifier = classifiers[ado] as string;
    if (ado === 'app' as any) {
        _class = 'app';
        _classifier = 'app'
    }
    return {
        class: _class ?? '',
        classifier: _classifier ?? ""
    }
}