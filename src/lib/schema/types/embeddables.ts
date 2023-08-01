export interface IEmbeddableConfig {
    name: string;
    chainId: string;
    coinDenom: string;
    collections: IEmbeddableCollection[];
    $type: string;
    key: string;
}

export interface IEmbeddableCollection {
    id: string;
    type: IEmbeddableType;
    name: string;
}

export enum IEmbeddableType {
    CW721 = "embeddables-cw721"
}