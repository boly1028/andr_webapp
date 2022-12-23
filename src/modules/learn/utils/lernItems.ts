import { AndromedaIcon, AppBuilder, CliIcon, CubeIcon, PlusIcon } from "@/modules/common";
import { Puzzle, Triangle, Wallet } from "lucide-react";
import { ILearnPageItem } from "../types";

export const LEARN_PAGE_ITEMS: ILearnPageItem[] = [
    {
        title: 'Conceptual Breakdown of Andromeda',
        description: 'Kick start your learning with these lessons',
        items: [
            {
                title: 'A quick into to Andromeda',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.',
                icon: AndromedaIcon
            },
            {
                title: 'ADO architecture',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.',
                icon: CubeIcon
            },
            {
                title: 'App architecture',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.',
                icon: Triangle
            }
        ]
    },
    {
        title: 'The Basics',
        description: 'Kick start your learning with these lessons',
        items: [
            {
                title: 'Setting up your wallet',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.',
                icon: Wallet
            },
            {
                title: 'What is an ADO?',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.',
                icon: CubeIcon
            },
            {
                title: 'What is an App?',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.',
                icon: AppBuilder
            }
        ]
    },
    {
        title: 'How to Guides',
        description: 'Kick start your learning with these lessons',
        items: [
            {
                title: 'Build your first ADO',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.',
                icon: PlusIcon
            },
            {
                title: 'Build your first App',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.',
                icon: Puzzle
            },
            {
                title: 'How to use the CLI?',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenati.',
                icon: CliIcon
            }
        ]
    }
]