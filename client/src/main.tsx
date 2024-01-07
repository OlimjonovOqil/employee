import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "@/app/store"
import "@/index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Paths } from "@/paths"
import { Login } from "@/pages/login"
import { Register } from "@/pages/register"
import { ConfigProvider, theme } from "antd"
import { Employees } from "@/pages/employees"
import { AddEmployee } from "@/pages/add-employee"
import { Status } from "@/pages/status"
import { Employee } from "./pages/employee"
import { EditEmployee } from "./pages/edit-employee"

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
  {
    path: Paths.empoloyeeAdd,
    element: <AddEmployee />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>,
)
