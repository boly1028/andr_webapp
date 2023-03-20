import { Msg } from "@andromedaprotocol/andromeda.js";
import { Coin } from "@cosmjs/amino";

export type ICliQueryGenerator = (data: {
    funds?: Coin[],
    msg: Msg,
    address?: string,
    codeId?: number
}) => string;

export const EXECUTE_CLI_QUERY: ICliQueryGenerator = ({ msg, address, funds }) => {
    if (typeof address === 'undefined') throw new Error("Address is required")
    const query = ['wasm', 'execute', address];
    query.push("'" + JSON.stringify(msg) + "'")
    // if (funds) {
    //     query.push('--funds')
    //     query.push(JSON.stringify(funds))
    // }
    query.push('--simulate')
    return query.join(' ');
}

export const INSTANTIATE_CLI_QUERY: ICliQueryGenerator = ({ msg, address, funds, codeId }) => {
    if (typeof codeId === 'undefined') throw new Error("CodeID is required")
    const query = ['wasm', 'instantiate', codeId.toString()];
    query.push("'" + JSON.stringify(msg) + "'")
    // if (funds) {
    //     query.push('--funds')
    //     query.push(JSON.stringify(funds))
    // }
    query.push('--simulate')
    query.push('--print')
    return query.join(' ');
}