import {
  SystemStyleObject,
  SystemStyleFunction,
  getColor,
} from "@chakra-ui/theme-tools";

const baseStyle: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  return {
    fontWeight: 500,
    borderRadius: "lg",
    _disabled: {
      cursor: "not-allowed",
      boxShadow: "none",
    },
    _active: {
      bg: `${c}.700`,
    },
    _focus: {
      bg: `${c}.700`,
      borderColor: `${c}.300`,
      boxShadow: `0 0 0 1px ${getColor(theme, `${c}.100`)}`,
    },
  };
};


const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  return {
    borderColor: `${c}.500`
  };
};

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  return {
    bg: `${c}.500`,
    color: "base.white",
    _hover: {
      bg: `${c}.700`,
      _disabled: {
        bg: `${c}.100`,
      },
    }
  };
};

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props;

  return {
    bg: `rgba(255,255,255,0)`,
    color: `${c}.500`,
    _hover: {
      bg: `rgba(255,255,255,0.1)`,
      _disabled: {
        bg: `rgba(255,255,255,0.1)`,
      },
    },
  };
};

const variants = {
  outline: variantOutline,
  solid: variantSolid,
  ghost: variantGhost,
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
    px: 2.5,
  },
  xl: {
    h: "48px",
    fontSize: "md",
    px: 3,
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
