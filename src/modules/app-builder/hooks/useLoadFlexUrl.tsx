import { useGetFlexFileFromSession, useGetFlexFileFromUrl } from "@/modules/flex-builder/hooks/useFlexFile"
import { useEffect, useMemo } from "react";
import { useImportFlex } from "./useImportFlex";

export const useLoadFlexUrl = () => {
    const { flex: urlFlex } = useGetFlexFileFromUrl();
    const { flex: sessionFlex } = useGetFlexFileFromSession();
    const template = useMemo(() => urlFlex ?? sessionFlex, [urlFlex, sessionFlex]);
    const { importFlexFile } = useImportFlex();
    useEffect(() => {
        if (template)
            importFlexFile(template).catch(console.warn)
    }, [template])
}