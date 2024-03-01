import { IAdoType } from "@/lib/schema/types";

/**
 * App Contract refer to app-contract/0.1.0/app-contract schema for fields
 */
export interface IAppContract {
    [index: string]: any;
    name: string;
    owner?: string;
    kernel_address: string;
    app_components: Array<{
        ado_type: string;
        component_type: IAppNewComponent | IAppSymlinkComponent | IAppCrossChainComponent;
        name: string;
    }>;
    chain_info: Array<{
        chain_name: string;
        owner: string;
    }>;
}

export interface IAppNewComponent {
    new: string;
}
export interface IAppSymlinkComponent {
    symlink: string;
}
export interface IAppCrossChainComponent {
    cross_chain: {
        chain: string;
        instantiate_msg: string;
    }
}

/**
 * Proxy Message refer to app-contract/0.1.0/proxy-message schema for fields
 */
export interface IProxyMessage {
    [index: string]: any;
    "proxy_message": {
        name: string;
        msg: string;
    }
}
