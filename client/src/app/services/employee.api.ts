import { Employee } from "@prisma/client"
import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithRetry } from "./api"

type EmployeeData = Omit<Employee, "id" | "userId">
type EmployeeDataWithoutUserId = Omit<Employee, "userId">

export const employeeApi = createApi({
  reducerPath: "api/employees",
  baseQuery: baseQueryWithRetry,
  refetchOnFocus: true,
  tagTypes: ["Post"],
  endpoints: (build) => ({
    allEmployees: build.query<Employee[], void>({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
      providesTags: () => ["Post"],
    }),
    getEmployee: build.query<Employee, string>({
      query: (id: string) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),
    addEmployee: build.mutation<Employee, EmployeeData>({
      query: (body: EmployeeData) => ({
        url: "/employees/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    editEmployee: build.mutation<Employee, EmployeeDataWithoutUserId>({
      query: ({ id, ...body }: EmployeeDataWithoutUserId) => ({
        url: `/employees/edit/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    deleteEmployee: build.mutation<Employee, string>({
      query: (id: string) => ({
        url: `/employees/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
})

export const {
  useAllEmployeesQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi
