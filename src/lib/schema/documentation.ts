import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { IImportantAdoKeys } from "./types";

export const SYSTEM_DOCUMENTATION_LINKS = {
    [IImportantAdoKeys.PUBLISH_SETTINGS]: SITE_LINKS.documentation('app'),
    [IImportantAdoKeys.PROXY_MESSAGE]: SITE_LINKS.documentation('app', 'proxymessage'),
    [IImportantAdoKeys.FUND]: 'https://docs.andromedaprotocol.io/andromeda/platform-and-framework/common-types#coin'
}