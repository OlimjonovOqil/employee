import { useAllEmployeesQuery } from "@/app/services/employee.api"
import { CustomButton } from "@/components/custom-button"
import { Layout } from "@/components/layout"
import { Paths } from "@/paths"
import { PlusCircleOutlined } from "@ant-design/icons"
import { Employee } from "@prisma/client"
import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
]

export const Employees = () => {
  const { data, isLoading } = useAllEmployeesQuery()
  const navigate = useNavigate()

  const user = localStorage.getItem("token")

  const goToAddUser = () => {
    navigate(Paths.empoloyeeAdd)
  }

  useEffect(() => {
    !user && navigate(Paths.login)
  }, [user, navigate])

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={goToAddUser}
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          }
        }}
      />
    </Layout>
  )
}
