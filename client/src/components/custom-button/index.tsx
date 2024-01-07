import { Button, Form } from "antd"
import React from "react"

interface Props {
  children: React.ReactNode
  htmlType?: "button" | "submit" | "reset" | undefined
  onClick?: () => void
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined
  danger?: boolean
  loading?: boolean
  shape?: "default" | "circle" | "round" | undefined
  icon?: React.ReactNode
  justify?: string
}

export const CustomButton = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  onClick,
  justify,
}: Props) => {
  return (
    <Form.Item style={{ display: "flex", justifyContent: justify }}>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
      >
        {children}
      </Button>
    </Form.Item>
  )
}
