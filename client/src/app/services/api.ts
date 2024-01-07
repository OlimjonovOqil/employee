import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token")
    token && headers.set("Authorization", `Bearer ${token}`)

    return headers
  },
})

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

// export const api = {
//   reducePath: "splitApi",
//   baseQuery: baseQueryWithRetry,
//   refetchOnMountOrArgChange: true,
//   endpoinds: () => ({}),
// }
