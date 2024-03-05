import { useAddEmployeeMutation } from "@/app/services/employee.api"
import { EmployeeForm } from "@/components/employee-form"
import { Layout } from "@/components/layout"
import { Paths } from "@/paths"
import { IsErrorWithMessage } from "@/utils/is-error-with-message"
import { Employee } from "@prisma/client"
import { Row } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AddEmployee = () => {
  const [error, setError] = useState<string>("")
  const [addEmployee] = useAddEmployeeMutation()
  const navigate = useNavigate()
  const user = localStorage.getItem("token")

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()
      navigate(`${Paths.status}/created`)
    } catch (error) {
      const mayBeError = IsErrorWithMessage(error)
      mayBeError ? setError(error.data.message) : setError("Неизвестная ошибка")
    }
  }

  useEffect(() => {
    !user && navigate(Paths.login)
  }, [user, navigate])
  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}
