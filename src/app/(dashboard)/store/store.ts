import { configureStore } from "@reduxjs/toolkit"
import sidebarReducer from "./slices/sidebarSlice"
import mailServersReducer from "./slices/mailServersSlice"
import warmupsReducer from "./slices/warmupsSlice"
import emailListsReducer from "./slices/emailListsSlice"

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        mailServers: mailServersReducer,
        warmups: warmupsReducer,
        emailLists: emailListsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
