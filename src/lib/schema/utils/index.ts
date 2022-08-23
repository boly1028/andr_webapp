export namespace SCHEMA {
    const BASE = 16;
    /** 
     * Constant for restricting maximum number of characters in hex string
     * Convert max hex to decimal
     */
    const MAX_DEC_FROM_HEX = parseInt('FFFFFF', BASE)
    const numToBase = (num: number) => Math.floor(num).toString(BASE).toUpperCase()

    /**
     * Use the max value to generate a number from 0-MAX_DEC_FROM_HEX and then again convert it to hex
     * @returns new schema id
     */
    export const suid = () => numToBase(Math.random() * MAX_DEC_FROM_HEX)

    /**Instead of hitting random again, just getting the next number is easier because of scattered nature */
    export const nextSuid = (prev: string) => numToBase((parseInt(prev, BASE) + 1) % (MAX_DEC_FROM_HEX + 1))

}
