import { sumCoins } from "@/modules/sdk/hooks/useGetFunds";
import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/amino";

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
    return `${sum.amount}${sum.denom}`
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
    query.push('--simulate')
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
    query.push('--simulate')
    query.push('--print')
    return query.join(' ');
}