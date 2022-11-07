import { ITemplateFormData } from "@/lib/schema/templates/types";
import { IImportantAdoKeys } from "@/lib/schema/types";
import { coin as createCoin, Coin, addCoins, coins } from "@cosmjs/amino";
import { useCallback } from "react";
import { constructMsg } from "../utils";

export default function useGetFunds() {
  const getFunds = useCallback((data: ITemplateFormData) => {
    console.clear();

    let funds: Coin[] = [];

    Object.entries(data).forEach(([id, panel]) => {
      if (panel.$type !== IImportantAdoKeys.FUND) return;
      // If panel is disabled, skip it
      if (panel.$enabled === false) return;

      // Remove hidden fields from panel
      const fund = constructMsg(panel);
      const coin = createCoin(fund.amount, fund.denom);
      funds.push(coin);
    });
    const sum = sumCoins(funds);
    if (sum) funds = [sum];
    return funds;
  }, []);

  return getFunds;
}

export const sumCoins = (coins: Coin[]) => {
  if (coins.length === 0) return undefined;
  return coins.reduce((res, cur) => addCoins(res, cur));
};
