import { SystemStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  fontWeight: 400,
  _disabled: {
    cursor: "not-allowed",
    boxShadow: "none",
  },
};

const sizes: Record<string, SystemStyleObject> = {
  sm: {
    fontSize: "sm",
  },
  md: {
    fontSize: "sm",
  },
  lg: {
    fontSize: "md",
  },
  xl: {
    fontSize: "md",
  },
  "2xl": {
    fontSize: "lg",
  },
};

const styles = {
  baseStyle,
  sizes,
};

export default styles;
