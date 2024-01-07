import { UserData, useLoginMutation } from "@/app/services/auth.api"
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { ErrorMessage } from "@/components/error-message"
import { Layout } from "@/components/layout"
import { PasswordInput } from "@/components/password-input"
import { Paths } from "@/paths"
import { IsErrorWithMessage } from "@/utils/is-error-with-message"
import { Card, Form, Row, Space, Typography } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Login = () => {
  const [login] = useLoginMutation()
  const [error, setError] = useState<string>("")

  const navigate = useNavigate()

  const userLogin = async (data: UserData) => {
    try {
      await login(data).unwrap()
      navigate(Paths.home)
    } catch (error) {
      const mayBeError = IsErrorWithMessage(error)
      mayBeError
        ? setError(error.data.message)
        : setError("Неизвестная ошибка!")
    }
  }

  return (
    <Layout display="flex">
      <Row align="middle" justify="center">
        <Card title="Войдитe" style={{ width: "30rem" }}>
          <Form onFinish={userLogin}>
            <CustomInput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
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
              Войти
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
              Нет аккаунта? <Link to={Paths.register}>Зарегестрируйтесь</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
