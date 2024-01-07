import { useRegisterMutation } from "@/app/services/auth.api"
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { ErrorMessage } from "@/components/error-message"
import { Layout } from "@/components/layout"
import { PasswordInput } from "@/components/password-input"
import { Paths } from "@/paths"
import { IsErrorWithMessage } from "@/utils/is-error-with-message"
import { Card, Row, Space, Form, Typography } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type RegisterData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const Register = () => {
  const [register] = useRegisterMutation()
  const [error, setError] = useState<string>("")

  const navigate = useNavigate()

  const userRegister = async (data: RegisterData) => {
    const { confirmPassword, ...body } = data

    try {
      await register(body).unwrap()

      navigate(Paths.login)
    } catch (err) {
      const mayBeError = IsErrorWithMessage(err)
      mayBeError ? setError(err.data.message) : setError("Неизвестная ошибка!")
    }
  }

  return (
    <Layout display="flex">
      <Row align="middle" justify="center" style={{ margin: "auto 0" }}>
        <Card title="Зарегестрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={userRegister}>
            <CustomInput name="name" placeholder="Имя" />
            <CustomInput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Повторите пароль"
            />
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
            <CustomButton type="primary" htmlType="submit" justify="end">
              Зарегестрироваться
            </CustomButton>
          </Form>
          <Space
            direction="vertical"
            size="large"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography.Text>
              Уже регестированы? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
