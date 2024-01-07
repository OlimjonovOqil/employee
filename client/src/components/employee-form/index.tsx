import { Employee } from "@prisma/client"
import { Card, Form, Space } from "antd"
import React from "react"
import { CustomInput } from "../custom-input"
import { ErrorMessage } from "../error-message"
import { CustomButton } from "../custom-button"

interface Props<T> {
  onFinish: (value: T) => void
  btnText: string
  title: string
  error?: string
  employee?: T
}

export const EmployeeForm = ({
  onFinish,
  btnText,
  title,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="Имя" />
        <CustomInput type="text" name="lastName" placeholder="Фамилия" />
        <CustomInput type="number" name="age" placeholder="Возраст" />
        <CustomInput type="text" name="address" placeholder="Адрес" />
        {error && (
          <Space
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <ErrorMessage message={error} />
          </Space>
        )}
        <CustomButton htmlType="submit" justify="end">
          {btnText}
        </CustomButton>
      </Form>
    </Card>
  )
}
