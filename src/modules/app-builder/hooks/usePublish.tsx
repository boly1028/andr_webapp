import { useCodeId } from "@/lib/andrjs";
import { ITemplateFormData } from "@/lib/schema/templates/types";
import { useInstantiateModal } from "@/modules/modals/hooks";
import usePanelRenameModal from "@/modules/modals/hooks/usePanelRenameModal";
import { useConstructAppMsg } from "@/modules/sdk/hooks";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";
import { AppConfig } from "../config";
import { useAppFormData } from "./useAppFormData";
import { useHotkeys } from "react-hotkeys-hook";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";
import { SHORTCUT_SCOPES } from "../shortcuts/scopes";

export const usePublish = () => {
    const { formRefs, editorRef } = useAppBuilder()
    const getFormData = useAppFormData()
    const { getNodes } = useReactFlow()

    const toast = useToast({
        position: 'top-right',
        variant: 'solid'
    })
    const codeId = useCodeId("app");
    const construct = useConstructAppMsg();
    const openModal = useInstantiateModal(codeId);

    const openAppRename = usePanelRenameModal()

    const getMsg = useCallback((name?: string) => {
        try {
            const nodes = getNodes()
            const ados = formRefs.current ?? {};
            nodes.forEach(node => {
                const adoKey = node.id;
                if (ados[adoKey]) {
                    console.log(ados[adoKey].formData)
                    ados[adoKey].validate();
                }
            })
            const formData = getFormData()
            const appName = name ?? editorRef.current.getAppName?.() ?? AppConfig.DEFAULT_APP_NAME
            const msg = construct(formData, appName);
            return msg;
        } catch (err: any) {
            console.log(err)
            toast({
                title: `Error while validating`,
                description: err.message,
                status: 'error'
            })
        }
    }, [getNodes, formRefs, getFormData, editorRef, construct, toast, AppConfig.DEFAULT_APP_NAME])

    const handlePublish = useCallback((name?: string) => {
        if (codeId === -1) {
            console.warn("Code ID not fetched");
            return;
        }
        const msg = getMsg(name);
        if (msg) {
            openModal(msg);
        }
    }, [codeId, openModal, getMsg])

    const publishAppWithAppRename = useCallback(() => {
        const name = editorRef.current.getAppName?.() ?? AppConfig.DEFAULT_APP_NAME;
        openAppRename({
            title: "App Name",
            body: "What do you want to call your app?",
            defaultName: name,
            reservedNames: [],
            'callback': (newName: string) => {
                editorRef.current.setAppName?.(newName);
                handlePublish(newName);
            },
            match: /^.+$/i,
            preventSameSubmission: false,
            acceptButtonText: "Publish"
        })
    }, [openAppRename, editorRef, AppConfig, handlePublish])

    return { handlePublish, getMsg, publishAppWithAppRename }
}

export const usePublishShortcut = (enabled = true, description = 'Publish App') => {
    const { publishAppWithAppRename } = usePublish();
    const { shortcutEnabled, isDirty } = useAppBuilder()
    useHotkeys(APP_BUILDER_KEYCODES.PUBLISH, () => publishAppWithAppRename(), {
        scopes: [SHORTCUT_SCOPES.CANVAS],
        enabled: shortcutEnabled && enabled && isDirty,
        description: description,
        preventDefault: true
    })
}