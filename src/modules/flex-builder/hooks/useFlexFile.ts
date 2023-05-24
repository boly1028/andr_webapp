import { ITemplate } from "@/lib/schema/types";
import { getAppTemplateById } from "@/lib/schema/utils";
import { parseFlexFile, parseFlexUrl } from "@/lib/schema/utils/flexFile";
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo, useState } from "react";


export const useGetFlexFileFromUrl = (key = 'data') => {
    const [loading, setLoading] = useState(true);
    const [flex, setFlex] = useState<ITemplate>();
    const router = useRouter();

    const templateUri = useMemo(() => {
        return router.query[key] as string ?? '';
    }, [router.query, key])

    const process = useCallback(async () => {
        let template = await getAppTemplateById(templateUri).catch(err => undefined)
        if (template) return template;
        template = await parseFlexUrl(templateUri);
        return template;
    }, [templateUri])

    useEffect(() => {
        setLoading(true)
        process()
            .then(res => setFlex(res))
            .catch(console.error).finally(() => {
                setLoading(false);
            })
    }, [templateUri])

    return { flex, loading };
}

export const useGetFlexFileFromSession = (key = 'ANDROMEDA_TEMPLATE') => {
    const [loading, setLoading] = useState(true);
    const [flex, setFlex] = useState<ITemplate>();

    useEffect(() => {
        /**Session Storage is not available for SSR, Only render when window is defined (Client Side) */
        if (typeof window === "undefined") return;
        setLoading(true)
        setFlex(undefined);
        /** 
         * Get Flex from storage. If any validation is required, add it here. Add the same validation
         * during upload also so user knows early if wrong file is uploaded
         */
        const storageData = sessionStorage.getItem(key);
        if (storageData) {
            const jsonValue = JSON.parse(storageData);
            parseFlexFile(jsonValue).then((res) => {
                setFlex(res);
                sessionStorage.removeItem(key);
            }).catch(console.warn)
                .finally(() => {
                    setLoading(false)
                });
        } else {
            setLoading(false)
        }
    }, [key])

    return { flex, loading };
}