export interface IEmbeddableConfig {
    name: string;
    chainId: string;
    coinDenom: string;
    collections: IEmbeddableCollection[];
    $type: string;
}

export interface IEmbeddableCollection {
    id: string;
    type: IEmbeddableType;
}

export enum IEmbeddableType {
    CW721 = "embeddables-cw721"
}