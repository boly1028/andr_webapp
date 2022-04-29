import {
  mode,
  SystemStyleObject,
  SystemStyleFunction,
} from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleObject = {
  fontWeight: 500,
  borderRadius: "xl",
  _disabled: {
    cursor: "not-allowed",
    boxShadow: "none",
  },
};

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.300`, `whiteAlpha.300`)(props);
  return {
    borderColor: c === "gray" ? borderColor : "currentColor",
    _focus: {
      boxShadow: "none",
    },
  };
};

const variants = {
  outline: variantOutline,
};

const sizes: Record<string, SystemStyleObject> = {
  sm: {
    fontSize: "sm",
  },
  md: {
    fontSize: "sm",
  },
  lg: {
    h: "44px",
    fontSize: "sm",
    px: "2.5",
  },
  xl: {
    h: "48px",
    fontSize: "md",
    px: "3",
  },
  "2xl": {
    fontSize: "lg",
  },
};

const styles = {
  baseStyle,
  variants,
  sizes,
};

export default styles;
