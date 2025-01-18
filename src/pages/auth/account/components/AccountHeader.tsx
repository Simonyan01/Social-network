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

    const { name, surname, picture, isPrivate, followers, following, posts } = account

    return (
        <>
            <header className="flex flex-col items-center text-center">
                {picture && (
                    <img
                        className="w-44 h-44 rounded-full object-cover border-4 border-solid border-indigo-500"
                        src={`${BASE_URL}${picture}`}
                        alt={`${name} ${surname}'s profile picture`}
                    />
                )}
                <h1 className="text-2xl font-bold mt-4 flex items-center gap-2">
                    {name} {surname}{" "}
                    {isPrivate ? (
                        <FaLock className="text-gray-500" title="Private Account" />
                    ) : (
                        <FaLockOpen className="text-green-500" title="Public Account" />
                    )}
                </h1>
                <ActionButton />
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-lg font-semibold">{followers.length}</p>
                        <p className="text-gray-600">Followers</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{following.length}</p>
                        <p className="text-gray-600">Following</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{posts.length}</p>
                        <p className="text-gray-600">Posts</p>
                    </div>
                </div>
            </header>
            <section className="mt-8 w-full">
                <Gallery userPosts={posts} />
            </section>
        </>
    )
}
