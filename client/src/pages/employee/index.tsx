import {
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
} from "@/app/services/employee.api"
import { CustomButton } from "@/components/custom-button"
import { ErrorMessage } from "@/components/error-message"
import { Layout } from "@/components/layout"
import { Paths } from "@/paths"
import { IsErrorWithMessage } from "@/utils/is-error-with-message"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Descriptions, Divider, Modal, Space } from "antd"
import { useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

export const Employee = () => {
  const [error, setError] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { id } = useParams<string>()
  const { data, isLoading } = useGetEmployeeQuery(id || "")
  const [deleteEmployee] = useDeleteEmployeeMutation()
  const userId = localStorage.getItem("id")

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

  const handleDeleteEmployee = async () => {
    setIsModalOpen(false)

    try {
      await deleteEmployee(data.id).unwrap()

      navigate(`${Paths.status}/deleted`)
    } catch (error) {
      const mayBeError = IsErrorWithMessage(error)
      mayBeError
        ? setError(error.data.message)
        : setError("Неизвестная ошибка!")
    }
  }

  return (
    <Layout>
      <Descriptions title="Информация о сотруднике" bordered>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Возраст" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {userId === data.userId && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${id}`}>
              <CustomButton shape="round" icon={<EditOutlined />}>
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={() => setIsModalOpen(true)}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Подтверждение удаления"
        open={isModalOpen}
        onOk={handleDeleteEmployee}
        onCancel={() => setIsModalOpen(false)}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хохите удалить сотрудника из таблицы?
      </Modal>
    </Layout>
  )
}
