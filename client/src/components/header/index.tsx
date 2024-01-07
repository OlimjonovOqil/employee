import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { Layout, Space, Typography } from "antd"
import styles from "@/components/header/index.module.css"
import { Paths } from "@/paths"
import { CustomButton } from "@/components/custom-button"

export const Header = () => {
  const user = localStorage.getItem("token")
  const navigate = useNavigate()

  const onLogoutClick = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <Typography.Title level={1}>Сотрудники</Typography.Title>
        </Link>
      </Space>
      {user ? (
        <CustomButton icon={<LogoutOutlined />} onClick={onLogoutClick}>
          Выйти
        </CustomButton>
      ) : (
        <Space className={styles.right}>
          <Link to={Paths.register}>
            <CustomButton icon={<UserOutlined />}>
              Зарегестрироваться
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton icon={<LoginOutlined />}>Войти</CustomButton>
          </Link>
        </Space>
      )}
      {/* <Space className={styles.right}>
        <Link to={Paths.register}>
          <CustomButton icon={<UserOutlined />}>
            Зарегестрироваться
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton icon={<LoginOutlined />}>Войти</CustomButton>
        </Link>
      </Space> */}
    </Layout.Header>
  )
}
