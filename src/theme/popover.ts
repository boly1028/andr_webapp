import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";

const baseStyleContent: SystemStyleObject = {
  borderColor: "dark.300",
  bg:"dark.50",
  borderRadius: "lg",
  boxShadow: "xl",
  _focus: {
    outline: 0,
    boxShadow: "none",
  },
};

const baseStyleBody: SystemStyleObject = {
  p: 4,
};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  content: baseStyleContent,
  body: baseStyleBody,
});

const styles = {
  baseStyle,
};

export default styles;
