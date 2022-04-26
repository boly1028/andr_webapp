import { extendTheme } from "@chakra-ui/react";

import Heading from "./heading";
import Button from "./button";
import Tabs from "./tabs";
import Popover from "./popover";

export default extendTheme({
  fonts: {
    heading:
      "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    body: "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    mono: "Menlo, monospace",
  },
  components: {
    Heading,
    Button,
    Tabs,
    Popover,
  },
  colors: {
    primary: {
      600: "#7F56D9",
    },
    gray: {
      200: "#EAECF0",
      300: "#D0D5DD",
      500: "#667085",
      700: "#344054",
    },
  },
});
