import { METHODS, useHttpMutation } from "@hooks/useHttp"
import { AccountContext } from "../context"
import { IResponse } from "@helpers/types"
import { useContext } from "react"

export const ActionButton = () => {
    const { account, refetch } = useContext(AccountContext) ?? {}
    const [makeRequest] = useHttpMutation<IResponse>(refetch)

    if (!account) {
        throw new Error(account ? "Out of provider..." : "Account is null...")
    }

    const { id, connection } = account
    const { following, followsMe, requested } = connection

    const handleRequest = () => {
        makeRequest(`/account/follow/${id}`, METHODS.POST)
    }

    return (
        <button
            type="button"
            onClick={handleRequest}
            className="px-2 py-1 my-2 rounded-md bg-pink-500"
        >
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
