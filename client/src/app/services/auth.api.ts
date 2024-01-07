import { User } from "@prisma/client"
import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithRetry } from "./api"

export type UserData = Omit<User, "id" | "name">
export type UserDataWithName = Omit<User, "id">
type ResponseLoginData = User & { token: string }

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: baseQueryWithRetry,
  refetchOnFocus: true,
  endpoints: (build) => ({
    login: build.mutation<ResponseLoginData, UserData>({
      query: (body: UserData) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),
    register: build.mutation<ResponseLoginData, UserDataWithName>({
      query: (body: UserDataWithName) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
    }),
    current: build.query<ResponseLoginData, void>({
      query: () => ({
        url: "/user/current",
        method: "get",
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
  authApi
