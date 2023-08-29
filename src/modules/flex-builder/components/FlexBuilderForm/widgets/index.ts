import { RegistryWidgetsType } from "@andromedarjsf/utils";
import CheckboxWidget from "./CheckboxWidget";
import { MarkdownWidget } from "./MarkdownWidget";
import { Cw721ReceiveMsgWidget } from "./msg/CW721ReceiveMsgWidget";
import { ExecuteMsgWidget } from "./msg/ExecuteMsgWidget";
import { InstantiateMsgWidget } from "./msg/InstantiateMsgWidget";
import { SwitchWidget } from "./SwitchWidget";
import { DatetimeWidget } from "./Datetime";
import { DurationWidget } from "./Duration";
import { DenomWidget } from "./Denom";
import { NanoDatetimeWidget } from "./NanoDatetime";
import { MultiTabWidget } from "./multiTab";

const widgets: RegistryWidgetsType = {
  markdown: MarkdownWidget,
  switch: SwitchWidget,
  instantiateMsg: InstantiateMsgWidget,
  executeMsg: ExecuteMsgWidget,
  cw721ReceiveMsg: Cw721ReceiveMsgWidget,
  CheckboxWidget: CheckboxWidget,
  dateTime: DatetimeWidget,
  nanodateTime: NanoDatetimeWidget,
  duration: DurationWidget,
  denom: DenomWidget,
  'multi-tab': MultiTabWidget
}
export default widgets
