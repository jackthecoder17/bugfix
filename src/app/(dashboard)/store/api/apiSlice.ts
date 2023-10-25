import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { API_BASE } from "@/app/constants"
import { MailServer } from "@/app/types"

function getHeaders(token: string){
    return {
        Authorization: `Bearer ${token}`
    }
}

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE}`
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: ({ token }) => {
                return {
                    url: `/users`,
                    headers: getHeaders(token)
                }
            }
        }),
        getMailServers: builder.query<{
            pageSize: number,
            index: number, 
            totalResults: number,
            results: MailServer[]
        }, { token: string, index: number }>({
            query: ({ token, index }) => {
                return {
                    url: `/mailservers?index=${index}`,
                    headers: getHeaders(token)
                }
            }
        })
    })

})

export const {
    useGetMailServersQuery, useGetUserQuery
} = apiSlice
export default apiSlice
