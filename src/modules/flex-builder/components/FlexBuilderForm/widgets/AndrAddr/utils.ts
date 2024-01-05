import { useEffect, useState } from "react";

export const getLocalElement = (path = '') => {
    if (typeof document === 'undefined') return undefined;
    if (!path.startsWith('./')) return undefined;
    const el = document.getElementById(path.replace('./', ''));
    if (el) return el;
    return undefined;
}

export const useLocalElement = (path = '', paths: string[] = []) => {
    const [el, setEl] = useState<ReturnType<typeof getLocalElement>>();
    const refresh = () => {
        const _el = getLocalElement(path);
        setEl(_el);
    };
    useEffect(() => {
        const tid = setTimeout(refresh, 500);
        return () => clearInterval(tid);
    }, [path, paths])

    return { refresh, el };
}