import { RegistryWidgetsType } from "@andromedarjsf/utils";
import CheckboxWidget from "./CheckboxWidget";
import SelectWidget from "./SelectWidget";
import { MultiTabWidget } from "./multiTab";

const widgets: RegistryWidgetsType = {
  SelectWidget: SelectWidget,
  CheckboxWidget: CheckboxWidget,
  'multi-tab': MultiTabWidget
}
export default Object.freeze(widgets)
