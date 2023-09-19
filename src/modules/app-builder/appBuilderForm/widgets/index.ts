import { RegistryWidgetsType } from "@andromedarjsf/utils";
import CheckboxWidget from "./CheckboxWidget";
import SelectWidget from "./SelectWidget";
import { MultiTabWidget } from "./multiTab";
import AndrAddrWidget from "./AndrAddr";

const widgets: RegistryWidgetsType = {
  SelectWidget: SelectWidget,
  CheckboxWidget: CheckboxWidget,
  'tabs': MultiTabWidget,
  'AndrAddr': AndrAddrWidget
}
export default Object.freeze(widgets)
