import { Header } from "../header"
import styles from "./index.module.css"

import { Layout as AntLayout } from "antd"

interface Props {
  children: React.ReactNode
  display?: string
}

export const Layout = ({ children, display }: Props) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content
        style={{
          height: "calc(100% - 220px)",
          display: display,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </AntLayout.Content>
    </div>
  )
}
