import { ITemplateFormData } from "@/lib/schema/templates/types";
import { Coin } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import { constructMsg } from "../utils";

export default function useGetFunds() {
  const getFunds = useCallback((data: ITemplateFormData) => {
    console.clear();

    const funds: Coin[] = [];

    Object.entries(data).forEach(([id, panel]) => {
      if (panel.$type !== "fund") return;
      // If panel is disabled, skip it
      if (panel.$enabled === false) return;

      // Remove hidden fields from panel
      const fund = constructMsg(panel) as Coin;
      funds.push(fund);
    });

    return funds;
  }, []);

  return getFunds;
}
