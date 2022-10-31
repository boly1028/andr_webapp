import { ITemplate } from "@/lib/schema/types";

export interface IAppItemTemplate {
    src: string;
    id: string;
    templateId: string;
    installed: boolean;
}

export interface IAppItem extends IAppItemTemplate, ITemplate { }