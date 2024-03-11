import { ITemplateFormData } from "@/lib/schema/types/templates";
import { IImportantAdoKeys } from "@/lib/schema/types";
import { coin as createCoin, Coin, addCoins, coins } from "@cosmjs/amino";
import { useCallback } from "react";
import { constructMsg } from "../utils";

export default function useGetFunds() {
  const getFunds = useCallback((data: ITemplateFormData) => {
    console.clear();

    const funds: Coin[] = [];

    Object.entries(data).forEach(([id, panel]) => {
      if (panel.$type !== IImportantAdoKeys.FUND.key as any) return;
      // If panel is disabled, skip it
      if (panel.$enabled === false) return;

      // Remove hidden fields from panel
      const fund = constructMsg(panel);
      const coin = createCoin(fund.amount, fund.denom);
      funds.push(coin);
    });
    const sum = sumCoins(funds);
    return sum ?? [];
  }, []);

  return getFunds;
}

export const sumCoins = (coins: Coin[]) => {
  if (coins.length === 0) return undefined;
  const mapped_coins: Record<string, Coin> = {};
  coins.forEach(coin => {
    if (!mapped_coins[coin.denom]) {
      mapped_coins[coin.denom] = coin;
    } else {
      mapped_coins[coin.denom] = addCoins(mapped_coins[coin.denom], coin);
    }
  })
  return Object.values(mapped_coins);
};
