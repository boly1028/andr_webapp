import { ITemplateSchema } from "../templates/types";

const BASE = 16;
const MAX_BASE_VALUE = 'FFFFFF'
/** 
 * Constant for restricting maximum number of characters in hex string
 * Convert max hex to decimal
 */
const MAX_DEC_FROM_HEX = parseInt(MAX_BASE_VALUE, BASE)
const numToBase = (num: number) => Math.floor(num).toString(BASE).toUpperCase().padStart(MAX_BASE_VALUE.length, '0')

/**
 * Use the max value to generate a number from 0-MAX_DEC_FROM_HEX and then again convert it to hex
 * @returns new schema id
 */
// export const suid = () => numToBase(Math.random() * MAX_DEC_FROM_HEX)

// /**Instead of hitting random again, just getting the next number is easier because of scattered nature */
// export const nextSuid = (prev: string) => numToBase((parseInt(prev, BASE) + 1) % (MAX_DEC_FROM_HEX + 1))

export const humanReadableUuid = (prefix: string, minLength = 0, reservedNames: string[] = []) => {
    minLength = minLength + 1;
    const getName = (num: number) => `${prefix}-${num}`
    let id = getName(minLength)
    while (reservedNames.includes(id)) {
        minLength = minLength + 1;
        id = getName(minLength);
    }
    return id;
}

