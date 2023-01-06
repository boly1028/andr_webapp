import { RegistryWidgetsType } from "@andromedarjsf/utils";
import CheckboxWidget from "./CheckboxWidget";
import SelectWidget from "./SelectWidget";

const widgets: RegistryWidgetsType = {
  SelectWidget: SelectWidget,
  CheckboxWidget: CheckboxWidget,
}
export default Object.freeze(widgets)
