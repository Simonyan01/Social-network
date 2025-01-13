import { createBrowserRouter } from "react-router-dom"
import { Settings } from "@pages/auth/settings"
import { Profile } from "@pages/auth/profile"
import { Account } from "@pages/auth/account"
import { Layout } from "@pages/auth/layout"
import { Signup } from "@pages/signup"
import { Login } from "@pages/login"

export const routes = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: 'signup', element: <Signup /> },
    {
        path: 'profile', element: <Layout />,
        children: [
            { path: "", element: <Profile /> },
            { path: "settings", element: <Settings /> },
            { path: ":id", element: <Account /> },
        ]
    },
])