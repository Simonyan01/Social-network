import { ActionButton } from "./ActionButton"
import { BASE_URL } from "@helpers/constants"
import { AccountContext } from "../context"
import { useContext } from "react"

export const AccountHeader = () => {
    const context = useContext(AccountContext)
    if (!context) throw new Error("Out of provider...")

    const { account } = context
    if (!account) throw new Error("Account is null...")

    const { name, surname, picture } = account

    return (
        <>
            {picture && (
                <img
                    title="Profile picture"
                    className="w-44 h-44 rounded-full object-cover border-indigo-500 border-solid border-4"
                    src={BASE_URL + picture}
                />
            )}
            <h1 className="text-2xl">{name} {surname}</h1>
            <ActionButton />
        </>
    )
}