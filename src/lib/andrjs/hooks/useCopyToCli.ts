import { sumCoins } from "@/modules/sdk/hooks/useGetFunds";
import type { Msg } from "@andromedaprotocol/andromeda.js";
import type { Coin } from "@cosmjs/amino";

export type ICliQueryGenerator = (data: {
    funds?: Coin[],
    msg: Msg,
    address?: string,
    codeId?: number
}) => string;

const getMsg = (msg: Msg) => {
    return "'" + JSON.stringify(msg) + "'"
}

const getFunds = (funds?: Coin[]) => {
    const sum = sumCoins(funds ?? [])
    if (!sum) return undefined;
    return sum.map(coin => `${coin.amount}${coin.denom}`).join(',');
}

export const EXECUTE_CLI_QUERY: ICliQueryGenerator = ({ msg, address, funds }) => {
    if (typeof address === 'undefined') throw new Error("Address is required")
    const query = ['wasm', 'execute', address];
    query.push(getMsg(msg))
    const fundsQuery = getFunds(funds)
    if (fundsQuery) {
        query.push('--funds')
        query.push(fundsQuery)
    }
    query.push('--print')
    // query.push('--simulate') //pulled as simulation has been integrated as a pre-prompt for broadcasted messages in CLI
    return query.join(' ');
}

export const INSTANTIATE_CLI_QUERY: ICliQueryGenerator = ({ msg, codeId, funds }) => {
    if (typeof codeId === 'undefined') throw new Error("CodeID is required")
    const query = ['wasm', 'instantiate', codeId.toString()];
    query.push(getMsg(msg))
    const fundsQuery = getFunds(funds)
    if (fundsQuery) {
        query.push('--funds')
        query.push(fundsQuery)
    }
    query.push('--print')
    // query.push('--simulate') //pulled as simulation has been integrated as a pre-prompt for broadcasted messages in CLI
    return query.join(' ');
}