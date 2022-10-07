import { ITemplateFormData } from "@/lib/schema/templates/types";
import { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";
import { constructMsg } from "../utils";

/**
 * Provides a function to create ado construct messages. Ados are not base64 processed like apps.
 * We just have to filter systems field from panels. Also, only one panel can be instantiated using
 * this method.
 * Refer docs https://docs.andromedaprotocol.io/andromeda/andromeda-digital-objects/auction#instantiatemsg
 */
export default function useConstructADOMsg() {

  const construct = useCallback(
    (data: ITemplateFormData) => {
      console.clear();
      
      const panels = Object.keys(data);
      if (panels.length !== 1) throw new Error("Only 1 ADO can be processed at a time");

      const finalMsg: Msg = constructMsg(data[panels[0]]);

      console.log("Consrtuct msg:", finalMsg);
      return finalMsg;
    },
    [],
  );

  return construct;
}

