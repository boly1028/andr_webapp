import { IAdoType } from "@/lib/schema/types";

/**
 * App Contract refer to app-contract/0.1.0/app-contract schema for fields
 */
export interface IAppContract {
    [index: string]: any;
    name: string;
    kernel_address: string;
    app_components: Array<{
        ado_type: string;
        instantiate_msg: string;
        name: string;
    }>;
    target_ados?: string[]
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
