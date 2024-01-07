import { Button, Result, Row } from "antd"
import { Link, useParams } from "react-router-dom"

const Statuses: Record<string, string> = {
  created: "Пользователь успешно создан",
  updated: "Пользователь успешно изменен",
  deleted: "Пользователь успешно удален",
}

export const Status = () => {
  const { status } = useParams<string>()
  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={status ? "success" : 404}
        title={status ? Statuses[status] : "Не найдено"}
        extra={
          <Button key="dashbord">
            <Link to="/">На главную</Link>
          </Button>
        }
      />
    </Row>
  )
}
