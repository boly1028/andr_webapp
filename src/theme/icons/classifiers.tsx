import {
  Settings,
  Layers,
  Box,
  Coins,
  Banknote,
  Link,
  TimerReset,
  Landmark,
  Image,
  Codesandbox,
  ShieldCheck,
  Percent,
  Codepen,
  Binary,
  TextCursorInput,
  ToggleLeft,
  Hash,
  Code,
  Wallet,
  LayoutList,
} from "lucide-react"; // default

import React, { FC } from "react";

import { Icon } from "@/theme/ui-elements";
import { IconProps } from "@chakra-ui/react";

export const DEFAULT_CLASS_ICON = {
  system: Settings,
  app: Layers,
  baseado: Box,
  module: Codesandbox,
  modifier: Codesandbox,
  primitive: Codepen,
  default: Box,
} as const;

export const ADO_ICON = {
  token: Coins,
  sale: Banknote,
  external: Link,
  escrow: TimerReset,
  bank: Landmark,
  collectible: Image,
} as const;

export const MODULE_ICON = {
  security: ShieldCheck,
  rates: Percent,
} as const;

export const PRIMITIVE_ICON = {
  binary: Binary,
  string: TextCursorInput,
  boolean: ToggleLeft,
  number: Hash,
  array: Code,
  wallet: Wallet,
  address: LayoutList,
} as const;

export const CLASSIFIER_ICON = {
  ...DEFAULT_CLASS_ICON,
  ...ADO_ICON,
  ...MODULE_ICON,
  ...PRIMITIVE_ICON,
  default: Box,
} as const;

interface ClassifierIconProps extends IconProps {
  schemaClassifier: keyof typeof CLASSIFIER_ICON;
  schemaClass: keyof typeof DEFAULT_CLASS_ICON;
}
const ClassifierIcon: FC<ClassifierIconProps> = (props) => {
  const {
    schemaClassifier = "default",
    schemaClass = "default",
    ...iconProps
  } = props;

  const icon =
    CLASSIFIER_ICON[schemaClassifier] ??
    CLASSIFIER_ICON[schemaClass] ??
    CLASSIFIER_ICON.default;

  return <Icon as={icon} color={`${schemaClass}` + ".600"} {...iconProps} />;
};
export default ClassifierIcon;
