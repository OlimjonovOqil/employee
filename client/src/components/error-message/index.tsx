import { Alert } from "antd"

interface Props {
  message?: string
}

export const ErrorMessage = ({ message }: Props) => {
  if (!message) return null
  return <Alert message={message} type="error" />
}
