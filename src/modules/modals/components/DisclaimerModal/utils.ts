const TERMS_ACCEPT_STORAGE_KEY = 'andromeda-terms-expiry';
// 30 Days Expiry
const TERMS_EXPIRY_MS = 30 /**DAYS */ * 24 /**HOURS */ * 60 /**MINUTES */ * 60 /**SECONDS */ * 1000 /**MILLI SECONDS */;

export const getIsTermAccepted = () => {
    const dateAdded = parseInt(localStorage.getItem(TERMS_ACCEPT_STORAGE_KEY) ?? '0');
    const now = new Date().getTime();
    return ((now - dateAdded) <= TERMS_EXPIRY_MS)
}

export const setTermAccepted = () => {
    const now = new Date().getTime();
    localStorage.setItem(TERMS_ACCEPT_STORAGE_KEY, now.toString());
}