import { RegistryWidgetsType } from "@andromedarjsf/utils";
import CheckboxWidget from "./CheckboxWidget";
import { ExecuteMsgWidget } from "./ExecuteMsgWidget";
import { MarkdownWidget } from "./MarkdownWidget";
import { MsgWidget } from "./MsgWidget";
import { SwitchWidget } from "./SwitchWidget";

const widgets: RegistryWidgetsType = {
  markdown: MarkdownWidget,
  switch: SwitchWidget,
  msg: MsgWidget,
  executeMsg: ExecuteMsgWidget,
  CheckboxWidget: CheckboxWidget
}
export default widgets
