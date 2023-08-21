import { create } from "zustand";

export interface IAppStateStore {
    sidebarCollapse: boolean
}

export const useAppStateStore = create<IAppStateStore>((set, get) => ({
    sidebarCollapse: false
}))

export const toggleSidebar = () => {
    useAppStateStore.setState(prev => ({ sidebarCollapse: !prev.sidebarCollapse }))
}