export const getLocalElement = (path = '') => {
    if (typeof document === 'undefined') return undefined;
    if (!path.startsWith('./')) return undefined;
    const el = document.getElementById(path.replace('./', ''));
    if (el) return el;
    return undefined;
}