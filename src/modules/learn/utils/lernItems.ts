import { AndromedaIcon, AppBuilder, CliIcon, CubeIcon, PlusIcon, FileCheckIcon, BuildAnAppIcon, MintNFTIcon, CreateNFTIcon, ExtendingAppIcon, FilePlusIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { Puzzle, Triangle, Wallet } from "lucide-react";
import { ILearnPageItem } from "../types";

/* Removed for Re-Insertion Later
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
    */


export const LEARN_PAGE_ITEMS: ILearnPageItem[] = [

    {
        title: 'The Basics',
        description: 'Kick start your learning with these lessons',
        items: [
            {
                title: 'Setting Up Your Wallet',
                description: '',
                icon: Wallet,
                link: SITE_LINKS.learnItem('/andromeda/connecting-wallet-to-web-app')
            },
            {
                title: 'The App Store',
                description: '',
                icon: Puzzle,
                link: SITE_LINKS.learnItem('/andromeda/app-store')
            },
            {
                title: 'The ADO Builder',
                description: '',
                icon: CubeIcon,
                link: SITE_LINKS.learnItem('/andromeda/ado-builder')
            },
            {
                title: 'About Your Assets',
                description: '',
                icon: AppBuilder,
                link: SITE_LINKS.learnItem('/andromeda/assets-explore')

            },
            {
                title: 'Andromeda CLI',
                description: '',
                icon: CliIcon,
                link: SITE_LINKS.cli()

            }
        ]
    },
    {
        title: 'Auction Marketplace How to Guides',
        description: 'With a step-by-step template, build, mint, and auction your NFT or NFT collection in minutes.',
        items: [
            {
                title: '1: Building An App',
                description: '',
                icon: BuildAnAppIcon,
                link: SITE_LINKS.learnItem('/andromeda/auction-marketplace-guide-1')
            },
            {
                title: '1B: Building from a Template',
                description: '',
                icon: BuildAnAppIcon,
                link: SITE_LINKS.learnItem('/andromeda/auction-marketplace-guide-5')
            },
            {
                title: '2: Minting an NFT Collection',
                description: '',
                icon: MintNFTIcon,
                link: SITE_LINKS.learnItem('/andromeda/auction-marketplace-guide-2')
            },
            {
                title: '3: Creating an NFT Auction',
                description: '',
                icon: CreateNFTIcon,
                link: SITE_LINKS.learnItem('/andromeda/auction-marketplace-guide-3')
            },
            {
                title: '4: Extending your App',
                description: '',
                icon: ExtendingAppIcon,
                link: SITE_LINKS.learnItem('/andromeda/auction-marketplace-guide-4')
            },
            {
                title: '5: Auctioning App in CLI',
                description: '',
                icon: CliIcon,
                link: 'https://docs.andromedaprotocol.io/andromeda/andromeda-apps/auctioning-app'
            }
        ]
    }
]