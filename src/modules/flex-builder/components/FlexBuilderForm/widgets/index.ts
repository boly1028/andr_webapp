import { RegistryWidgetsType } from "@rjsf/full/node_modules/@rjsf/utils";
import CheckboxWidget from "./CheckboxWidget";
import { MarkdownWidget } from "./MarkdownWidget";
import { MsgWidget } from "./MsgWidget";
import { SwitchWidget } from "./SwitchWidget";

const widgets: RegistryWidgetsType = {
  markdown: MarkdownWidget,
  switch: SwitchWidget,
  msg: MsgWidget,
  CheckboxWidget: CheckboxWidget
}
export default widgets
