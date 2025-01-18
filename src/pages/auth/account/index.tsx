import { AccountHeader } from "./components/AccountHeader"
import { Navigate, useParams } from "react-router-dom"
import { IAccount, IResponse } from "@helpers/types"
import { useHttpQuery } from "@hooks/useHttp"
import { AccountContext } from "./context"

export const Account = () => {
    const { id } = useParams()
    const { data, error, refetch } = useHttpQuery<IResponse>(`/account/${id}`)

    if (error) return <Navigate to="/profile" />

    const account: IAccount | null = data?.payload ? data?.payload as IAccount : null

    return (
        account && (
            <AccountContext.Provider value={{ account, refetch }}>
                <AccountHeader />
            </AccountContext.Provider>
        )
    )
}
