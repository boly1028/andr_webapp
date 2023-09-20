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
import { BinaryMsgWidget } from "./msg/Binary";
import AndrAddrWidget from "./AndrAddr";
import { QueryMsgWidget } from "./msg/QueryMsgWidget";

const widgets: RegistryWidgetsType = {
  markdown: MarkdownWidget,
  switch: SwitchWidget,
  instantiateMsg: InstantiateMsgWidget,
  executeMsg: ExecuteMsgWidget,
  cw721ReceiveMsg: Cw721ReceiveMsgWidget,
  queryMsg: QueryMsgWidget,
  CheckboxWidget: CheckboxWidget,
  dateTime: DatetimeWidget,
  nanodateTime: NanoDatetimeWidget,
  duration: DurationWidget,
  denom: DenomWidget,
  'tabs': MultiTabWidget,
  Binary: BinaryMsgWidget,
  JSON: BinaryMsgWidget,
  AndrAddr: AndrAddrWidget
}
export default widgets
