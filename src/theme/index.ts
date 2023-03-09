import { createLocalStorageManager, extendTheme, type ThemeConfig } from "@chakra-ui/react";

import Accordion from "./accordion";
import Button from "./button";
import Heading from "./heading";
import Input from "./input";
import Menu from "./menu";
import Modal from "./modal";
import Popover from "./popover";
import Spinner from "./spinner";
import Tabs from "./tabs";
import Tooltip from "./tooltip";
import Switch from "./switch";

import shadows from "./shadows";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const ThemeStorageManager = createLocalStorageManager("andromeda-theme");


export default extendTheme({
  config,
  styles: {
    global: {
      "*": {
        scrollbarWidth: "6px",
        scrollbarColor: "#7F56D9 transparent",
      },

      "*::-webkit-scrollbar": {
        width: "6px",
      },

      "*::-webkit-scrollbar-track": {
        bg: "transparent",
      },

      "*::-webkit-scrollbar-thumb": {
        bg: "#7F56D9",
        borderRadius: "1.5rem",
      },

      body: {
        bg: "dark.25",
      },
      span: {
        color: 'white'
      }
    },
  },
  shadows,
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
    Input,
    Menu,
    Modal,
    Popover,
    Spinner,
    Tabs,
    Tooltip,
    Switch
  },
  colors: {
    base: {
      black: "#000000",
      white: "#FFFFFF"
    },
    dark: {
      25: "#16161A",
      50: "#1D1D21",
      100: "#252529",
      200: "#2D2D32",
      300: "#35353A",
      500: "#9B9DA2",
    },
    primary: {
      25: "#ECF1FF",
      50: "#D9E4FF",
      100: "#C6D6FF",
      200: "#B3C9FF",
      300: "#8EADFF",
      400: "#6892FF",
      500: "#4277FF",
      600: "#3561D1",
      700: "#284AA3",
      800: "#1A3475",
      900: "#0D1D47",
    },
    gray: {
      25: "#FCFCFD",
      50: "#F9FAFB",
      100: "#F2F4F7",
      200: "#EAECF0",
      300: "#D0D5DD",
      400: "#98A2B3",
      500: "#667085",
      600: "#475467",
      700: "#344054",
      800: "#1D2939",
      900: "#101828",
    },
    error: {
      25: "#FFFBFA",
      50: "#FEF3F2",
      100: "#FEE4E2",
      200: "#FECDCA",
      300: "#FDA29B",
      400: "#F97066",
      500: "#F04438",
      600: "#D92D20",
      700: "#B42318",
      800: "#912018",
      900: "#7A271A",
    },
    warning: {
      25: "#FFFCF5",
      50: "#FFFAEB",
      100: "#FEF0C7",
      200: "#FEDF89",
      300: "#FEC84B",
      400: "#FDB022",
      500: "#F79009",
      600: "#DC6803",
      700: "#B54708",
      800: "#93370D",
      900: "#7A2E0E",
    },
    success: {
      25: "#F6FEF9",
      50: "#ECFDF3",
      100: "#D1FADF",
      200: "#A6F4C5",
      300: "#6CE9A6",
      400: "#32D583",
      500: "#12B76A",
      600: "#039855",
      700: "#027A48",
      800: "#05603A",
      900: "#054F31",
    },
    classifier: {
      25: "#F6FEFC",
      50: "#F0FDF9",
      100: "#CCFBEF",
      200: "#99F6E0",
      300: "#5FE9D0",
      400: "#2ED3B7",
      500: "#15B79E",
      600: "#0E9384",
      700: "#107569",
      800: "#125D56",
      900: "#134E48",
    },
    // Color range by type (ado / primitive / module /modifier)
    ado: {
      25: "#F5FBFF",
      50: "#F0F9FF",
      100: "#E0F2FE",
      200: "#B9E6FE",
      300: "#7CD4FD",
      400: "#36BFFA",
      500: "#0BA5EC",
      600: "#0086C9",
      700: "#026AA2",
      800: "#065986",
      900: "#0B4A6F",
    },
    // repeat of ado for defined read data from schema
    baseADO: {
      25: "#F5FBFF",
      50: "#F0F9FF",
      100: "#E0F2FE",
      200: "#B9E6FE",
      300: "#7CD4FD",
      400: "#36BFFA",
      500: "#0BA5EC",
      600: "#0086C9",
      700: "#026AA2",
      800: "#065986",
      900: "#0B4A6F",
    },
    // These are placeholder values for primitives until ones are defined
    primitive: {
      25: "#E4ECFC",
      100: "#D3D9FA",
      50: "#C4C2F7",
      200: "#C1B2F4",
      300: "#C2A2F1",
      400: "#C892ED",
      500: "#D283E8",
      600: "#CC71CD",
      700: "#B160A0",
      800: "#944F77",
      900: "#783E53",
    },
    module: {
      25: "#F5F8FF",
      50: "#EFF4FF",
      100: "#D1E0FF",
      200: "#B2CCFF",
      300: "#84ADFF",
      400: "#528BFF",
      500: "#2970FF",
      600: "#155EEF",
      700: "#004EEB",
      800: "#0040C1",
      900: "#00359E",
    },
    system: {
      25: "#16161A",
      50: "#1D1D21",
      100: "#252529",
      200: "#2D2D32",
      300: "#35353A",
      500: "#9B9DA2",
    },
    category: {
      app: '#21BEE0',
      ado: '#FEB059',
      baseado: '#FEB059',
      module: '#4D78FF',
      classifier: '#23EEF7',
      modifier: '#AB582C',
      primitive: '#DF2B5B',
      oracle: '#E863CB',
      asset: '#2187DD',
      protocol: '#1736B8',
      system: '#72757C',
      other1: '#B056DB',
      other2: '#00CB79',
      other3: '#FFE485'
    },
    backgroundstates: {
      idle: 'rgba(255, 255, 255, 0.09)',
      hover: 'rgba(255, 255, 255, 0.13)',
      active: 'rgba(255, 255, 255, 0.05)',
      disabled: 'rgba(255, 255, 255, 0.02)'
    },
    content: {
      high: 'rgba(255, 255, 255, 0.87)',
      medium: 'rgba(255, 255, 255, 0.6)',
      low: 'rgba(255, 255, 255, 0.38)',
      primarylow: '#81A2FF'
      
    }
  },
  textStyles: {
    h1: {
      fontWeight: 700,
      color: "gray.100",
      fontSize: "xl",
      mb: 2,
      letterSpacing: 0.5,
    },
    p: {
      color: "gray.100",
    },
    bold: {
      color: "gray.900",
      fontWeight: 700,
    },
    light: {
      color: "gray.500",
      fontSize: "sm",
    },
  },
});
