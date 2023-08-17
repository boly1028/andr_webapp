import theme from "@andromedaprotocol/design-theme";
import { createLocalStorageManager, extendTheme } from "@chakra-ui/react";

export const ThemeStorageManager = createLocalStorageManager("andromeda-theme");

export default extendTheme(theme);
