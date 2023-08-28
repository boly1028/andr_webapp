import { ITemplateFormData } from "@/lib/schema/templates/types";
import type { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";
import { constructMsg } from "../utils";

/**
 * Provides a function to execute ado construct messages. Ados are not base64 processed like apps.
 * We just have to filter systems field from panels. Also, only one panel can be instantiated using
 * this method.
 * Refer docs https://docs.andromedaprotocol.io/andromeda/andromeda-digital-objects/auction#executemsg
 */
export default function useConstructADOQueryMsg() {

  const construct = useCallback(
    (data: ITemplateFormData) => {
      console.clear();
      const panels = Object.values(data).filter(panel => panel.$class !== 'system' && panel.$enabled === true);
      if (panels.length !== 1) throw new Error("Only 1 ADO can be processed at a time");

      const finalMsg: Msg = constructMsg(panels[0]);
      console.log("Consrtuct msg:", finalMsg);
      return finalMsg;
    },
    [],
  );

  return construct;
}

