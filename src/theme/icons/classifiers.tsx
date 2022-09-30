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
  Component,
  Edit,
} from "lucide-react"; // default

import React, { FC } from "react";

import { Icon } from "@/theme/ui-elements";
import { IconProps } from "@chakra-ui/react";
import { SplitterIcon } from "@/modules/common";

export const DEFAULT_CLASS_ICON = {
  system: Settings,
  app: Layers,
  baseado: Box,
  module: Codesandbox,
  modifier: Edit,
  primitive: Codepen,
  default: Component,
} as const;

export const ADO_ICON = {
  token: Coins,
  sale: Banknote,
  external: Link,
  escrow: TimerReset,
  vault: Landmark,
  collectible: Image,
  splitter: SplitterIcon,
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

/**
 * Types are derived from the keys defined above. This will force you to typecast any
 * to the value you are passing here. However once a proper type system is present for
 * schema and its related value, we can use it to synchronize everywhere.
 * This typecheck will help if you are directly using this component instead of fetching
 * class/classifier types from schema
 */
interface ClassifierIconProps extends IconProps {
  schemaClassifier?: keyof typeof CLASSIFIER_ICON;
  schemaClass?: keyof typeof DEFAULT_CLASS_ICON;
}
const ClassifierIcon: FC<ClassifierIconProps> = (props) => {
  const { schemaClassifier = "", schemaClass = "", ...iconProps } = props;

  const icon =
    CLASSIFIER_ICON[schemaClassifier.toLowerCase()] ??
    CLASSIFIER_ICON[schemaClass.toLowerCase()] ??
    CLASSIFIER_ICON.default;

  return <Icon as={icon} color={`${schemaClass}` + ".600"} {...iconProps} />;
};
export default ClassifierIcon;
