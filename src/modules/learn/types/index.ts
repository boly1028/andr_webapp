import { IconProps } from "@chakra-ui/icons";
import { FC } from "react";

export interface ILearnPageItem {
    title: string;
    description: string;
    items: ILearnPageSubItem[];
}

export interface ILearnPageSubItem {
    icon: FC<any>;
    title: string;
    description: string;
    link?: string;
}