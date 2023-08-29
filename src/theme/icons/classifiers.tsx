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

import React, { FC, useMemo } from "react";

import { Icon } from "@/theme/ui-elements";
import { BackgroundProps, Flex, IconProps, useToken } from "@chakra-ui/react";
import { SplitterIcon } from "@/modules/common";
import { IAdoType } from "@/lib/schema/types";
import { getSchemaMeta } from "@/lib/schema/utils";

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
  adoType: string;
  schemaClassifier?: string;
  schemaClass?: string;
  type?: "solid" | "outline";
  w?: number | string;
  h?: number | string;
}

export const useGetClassColor = (props: { adoType?: IAdoType, _class?: string }, variant: 'default' | 'low' = 'default') => {
  const adoColor = useMemo(() => {
    if (!props._class && props.adoType) {
      const meta = getSchemaMeta(props.adoType);
      props._class = meta.class.toLowerCase();
    }
    const _class = props._class || 'module';
    let tokenCategory = 'category';
    if (variant === 'low') tokenCategory = tokenCategory + 'Low'
    return `${tokenCategory}.${_class}` as BackgroundProps['bg'];
  }, [props, variant]
  )
  return useToken('colors', adoColor as any)
}
const ClassifierIcon: FC<ClassifierIconProps> = (props) => {
  const {
    adoType,
    schemaClassifier,
    schemaClass,
    type = "solid",
    w,
    h,
    ...iconProps
  } = props;
  const meta = getSchemaMeta(adoType as IAdoType);

  const _classifier =
    schemaClassifier?.toLocaleLowerCase() || meta.classifier.toLowerCase();
  const _class = schemaClass?.toLocaleLowerCase() || meta.class.toLowerCase();
  const color = useGetClassColor({ _class: _class });

  const icon =
    CLASSIFIER_ICON[_classifier] ??
    CLASSIFIER_ICON[_class] ??
    CLASSIFIER_ICON.default;


  return (
    <Flex
      justify="center"
      align="center"
      borderRadius="lg"
      p={2}
      w={w ?? 8}
      h={h ?? 8}
      bgColor={type === "solid" ? color : "transparent"}
    >
      <Icon
        as={icon}
        color={type === "solid" ? "base.white" : color}
        w='80%'
        h='80%'
        {...iconProps}
      />
    </Flex>
  );
};
export default ClassifierIcon;
