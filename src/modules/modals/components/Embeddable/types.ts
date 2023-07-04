import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";
import { ModalType } from "../../types";

export interface EmbeddableModalProps {
    modalType: ModalType.Embeddable;
    config: IEmbeddableConfig;
    eKey?: string;
}