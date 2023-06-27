import { ITemplate } from "./types";
import { IImportantAdoKeys } from "../types";


export const EMBEDDABLE_TEMPLATES: ITemplate[] = [
    {
        id: 'nft',
        adoType: "primitive",
        name: "Embeddable",
        icon: "/app-templates/icons/blank.png",
        description: "Create embeddable to view your app live",
        opts: [
            "Import saved template",
            "Add on your prefered modules",
            "Save as a template",
            "Publish and use!",
        ],
        ados: [
            {
                path: 'embeddables/0.1.0/app',
                id: IImportantAdoKeys.EMBEDDABLE_APP,
                required: true,
            },
        ],
        modules: [
            { 'path': 'embeddables/0.1.0/auction' },
            { 'path': 'embeddables/0.1.0/marketplace' },
            { 'path': 'embeddables/0.1.0/crowdfund' },
        ],
    }
];