import { RegistryWidgetsType } from "@andromedarjsf/utils";
import CheckboxWidget from "./CheckboxWidget";
import { MarkdownWidget } from "./MarkdownWidget";
import { Cw721ReceiveMsgWidget } from "./msg/CW721ReceiveMsgWidget";
import { ExecuteMsgWidget } from "./msg/ExecuteMsgWidget";
import { InstantiateMsgWidget } from "./msg/InstantiateMsgWidget";
import { SwitchWidget } from "./SwitchWidget";

const widgets: RegistryWidgetsType = {
  markdown: MarkdownWidget,
  switch: SwitchWidget,
  instantiateMsg: InstantiateMsgWidget,
  executeMsg: ExecuteMsgWidget,
  cw721ReceiveMsg: Cw721ReceiveMsgWidget,
  CheckboxWidget: CheckboxWidget
}
export default widgets
