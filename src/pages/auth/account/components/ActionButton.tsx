import { METHODS, useHttpMutation } from "@hooks/useHttp"
import { AccountContext } from "../context"
import { IResponse } from "@helpers/types"
import { useContext } from "react"

export const ActionButton = () => {
    const context = useContext(AccountContext)
    if (!context) throw new Error("Out of provider...")

    const { account, refetch } = context
    if (!account) throw new Error("Account is null...")
    const [makeRequest] = useHttpMutation<IResponse>(refetch)

    const { id, connection } = account
    const { following, followsMe, requested } = connection


    const handleRequest = () => {
        makeRequest(`/account/follow/${id}`, METHODS.POST)
    }

    return (
        <button onClick={handleRequest} type="button" className="px-2 py-1 my-2 rounded-md bg-pink-500">
            {following
                ? "Unfollow"
                : followsMe
                    ? "Follow back"
                    : requested
                        ? "Cancel"
                        : "Follow"
            }
        </button>
    )
}
