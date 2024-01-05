import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { IImportantAdoKeys } from "./types";

export const SYSTEM_DOCUMENTATION_LINKS = {
    [IImportantAdoKeys.PUBLISH_SETTING.key]: SITE_LINKS.documentation('app'),
    [IImportantAdoKeys.PROXY_SETTING.key]: SITE_LINKS.documentation('app', 'proxymessage'),
    [IImportantAdoKeys.FUND.key]: 'https://docs.andromedaprotocol.io/andromeda/platform-and-framework/common-types#coin'
}