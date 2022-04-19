import { tabsAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleFunction,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";

const baseStyleTabpanel: SystemStyleObject = {
  p: 0,
};

const baseStyle: PartsStyleFunction<typeof parts> = () => ({
  tabpanel: baseStyleTabpanel,
});

const styles = {
  baseStyle,
};

export default styles;
