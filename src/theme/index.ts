import { extendTheme } from "@chakra-ui/react";

import Accordion from "./accordion";
import Button from "./button";
import Heading from "./heading";
import Menu from "./menu";
import Popover from "./popover";
import Spinner from "./spinner";
import Tabs from "./tabs";
import Tooltip from "./tooltip";

export default extendTheme({
  fonts: {
    heading:
      "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    body: "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    mono: "Menlo, monospace",
  },
  components: {
    Accordion,
    Button,
    Heading,
    Menu,
    Popover,
    Spinner,
    Tabs,
    Tooltip,
  },
  colors: {
    primary: {
      300: "#D6BBFB",
      600: "#7F56D9",
    },
    gray: {
      50: "#F9FAFB",
      200: "#EAECF0",
      300: "#D0D5DD",
      500: "#667085",
      700: "#344054",
      900: "#101828",
    },
    error: {
      100: "#FEE4E2",
      600: "#D92D20",
      700: "#B42318",
    },
  },
});
