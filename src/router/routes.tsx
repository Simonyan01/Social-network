import { Requests } from "@pages/auth/profile/components/Requests"
import { Followers } from "@pages/auth/account/components/Followers"
import { Followings } from "@pages/auth/account/components/Followings"
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
            { path: "followers", element: <Followers /> },
            { path: "followings", element: <Followings /> },
            { path: "requests", element: <Requests /> },
            { path: ":id", element: <Account /> },
        ]
    },
])