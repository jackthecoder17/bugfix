import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState = {
    isOpen: false
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.isOpen = true
        },
        closeSidebar: (state) => {
            state.isOpen = false
        }
    }
})


export const { closeSidebar, openSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer

export function selectIsSidebarOpen(state: RootState) {
    return state.sidebar.isOpen
}