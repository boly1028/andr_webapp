const baseStyleList = {
  boxShadow: "lg",
  minW: "9rem",
  maxH: "16rem",
  "overflow": "auto",
  py: 0,
  borderRadius: "lg",
  backgroundColor: "dark.50",
  borderColor: "dark.300",
};

const baseStyleItem = {
  color: "primary.25",
  py: "0.7rem",
  fontSize: "sm",
  fontWeight: 500,
  backgroundColor: "transparent",
  _hover: {
    backgroundColor: "dark.300",
  }
};

const baseStyle = {
  list: baseStyleList,
  item: baseStyleItem,
};

const styles = {
  baseStyle,
};

export default styles;
