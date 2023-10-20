import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { sampleMailServers } from "@/app/constants"

const initialState: {
    mailServers: typeof sampleMailServers
} = {
        mailServers: []
    }

const mailServersSlice = createSlice({
    name: "mailServers",
    initialState,
    reducers: {
        setMailServers: (state, action) => {
            state.mailServers = action.payload
        },
    }
})


export const { setMailServers } = mailServersSlice.actions
export default mailServersSlice.reducer

export function selectMailServers(state: RootState) {
    return state.mailServers.mailServers
}
