/**
 * WE ARE NOT USING THE FEATURE TO STORE USER ACCEPTANCE IN LOCAL STORAGE.
 * THIS CODE IS KEPT IN-CASE WE NEED IT AGAIN
 */

/**
 * @deprecated not used
 */
const TERMS_ACCEPT_STORAGE_KEY = 'andromeda-terms-expiry';

/**
 * 30 Days expiry
 * @deprecated not used
 */
const TERMS_EXPIRY_MS = 30 /**DAYS */ * 24 /**HOURS */ * 60 /**MINUTES */ * 60 /**SECONDS */ * 1000 /**MILLI SECONDS */;

/**
 * Checks if term has been accepted and is within expiry date
 * @deprecated not used
 */
export const getIsTermAccepted = () => {
    const dateAdded = parseInt(localStorage.getItem(TERMS_ACCEPT_STORAGE_KEY) ?? '0');
    const now = new Date().getTime();
    return ((now - dateAdded) <= TERMS_EXPIRY_MS)
}

/**
 * Sets term acceptance key as current date time
 * @deprecated not used
 */
export const setTermAccepted = () => {
    const now = new Date().getTime();
    localStorage.setItem(TERMS_ACCEPT_STORAGE_KEY, now.toString());
}