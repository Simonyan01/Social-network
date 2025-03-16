import { Gallery } from "@pages/auth/profile/components/Gallery"
import { FaLock, FaLockOpen } from "react-icons/fa"
import { ActionButton } from "./ActionButton"
import { BASE_URL } from "@helpers/constants"
import { AccountContext } from "../context"
import { useContext } from "react"

export const AccountHeader = () => {
    const { account } = useContext(AccountContext) ?? {}

    if (!account) {
        throw new Error(account ? "Out of provider..." : "Account is null...")
    }

    const { name, surname, picture, isPrivate, followers = [], following = [], posts = [] } = account

    const statistics = [
        { label: "Followers", count: followers.length },
        { label: "Following", count: following.length },
        { label: "Posts", count: posts.length }
    ]

    return (
        <>
            <header className="flex flex-col items-center text-center">
                <img
                    className="w-44 h-44 rounded-full object-cover border-4 border-solid border-indigo-500"
                    src={picture ? `${BASE_URL}${picture}` : "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png"}
                    alt={`${name} ${surname}'s profile picture`}
                />
                <h1 className="text-2xl font-bold mt-4 flex items-center gap-2">
                    {name} {surname}{" "}
                    {isPrivate ? (
                        <FaLock className="text-gray-500" />
                    ) : (
                        <FaLockOpen className="text-green-500" />
                    )}
                </h1>
                <ActionButton />
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    {statistics.map(({ label, count }) => (
                        <div key={label}>
                            <p className="text-lg font-semibold">{count}</p>
                            <p className="text-gray-600">{label}</p>
                        </div>
                    ))}
                </div>
            </header>
            <section className="mt-8 w-full">
                <Gallery userPosts={posts} account={account} />
            </section>
        </>
    )
}
