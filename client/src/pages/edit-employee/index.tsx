import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "@/app/services/employee.api"
import { EmployeeForm } from "@/components/employee-form"
import { Layout } from "@/components/layout"
import { Paths } from "@/paths"
import { IsErrorWithMessage } from "@/utils/is-error-with-message"
import { Employee } from "@prisma/client"
import { Row } from "antd"
import { useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

export const EditEmployee = () => {
  const [error, setError] = useState<string>()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetEmployeeQuery(id || "")
  const [editEmployee] = useEditEmployeeMutation()

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    )
  }

  if (!data) {
    return <Navigate to="/" />
  }

  const handleEditEmployee = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      }

      await editEmployee(editedEmployee).unwrap()

      navigate(`${Paths.status}/updated`)
    } catch (error) {
      const mayBeError = IsErrorWithMessage(error)
      mayBeError
        ? setError(error.data.message)
        : setError("Неизвестная ошибка!")
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Редактировать сотрудника"
          btnText="Редактировать"
          error={error}
          employee={data}
          onFinish={handleEditEmployee}
        />
      </Row>
    </Layout>
  )
}
