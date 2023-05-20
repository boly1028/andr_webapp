import { useDeleteShortcut } from "../hooks/useDeleteSelected"
import { useFitViewShortcut } from "../hooks/useFitView"
import { usePublishShortcut } from "../hooks/usePublish"
import { useResetShortcut } from "../hooks/useResetCanvas"
import { useZoomShortcut } from "../hooks/useZoom"

export const useAppShortcuts = () => {
    useDeleteShortcut()
    useResetShortcut()
    useFitViewShortcut()
    useZoomShortcut()
    usePublishShortcut()
}