export interface IEmbeddableConfig {
    name: string;
    chainId: string;
    coinDenom: string;
    collections: IEmbeddableCollection[];
    banner?: string;
    $type: string;
    key: string;
    createdDate: string;
    modifiedDate: string;
}

export interface IEmbeddableCollection {
    id: string;
    type: IEmbeddableType;
    name: string;
}

export enum IEmbeddableType {
    CW721 = "embeddables-cw721"
}