import JSONCrush from "jsoncrush";
import { IEmbeddableConfig } from "../types/embeddables";

export const createEmbeddableUrl = (config: IEmbeddableConfig) => {
    const compressed = JSONCrush.crush(JSON.stringify(config));
    const uri = encodeURIComponent(compressed)
    return uri;
}

export const parseEmbeddableUrl = (uri: string) => {
    const uriDecoded = decodeURIComponent(uri);
    const decompressed = JSONCrush.uncrush(uriDecoded);
    const parsed = JSON.parse(decompressed) as IEmbeddableConfig;
    return parsed
}