import styles from "@pages/auth/styles/profile.module.scss"
import { ProfileHeader } from "./components/ProfileHeader"
import { useOutletContext } from "react-router-dom"
import { Search } from "./components/Search"
import { IContext } from "@helpers/types"
import { Feed } from "./components/Feed"

export const Profile = () => {
    const { user } = useOutletContext<IContext>() || {}

    return user && (
        <>
            <div className={styles.profileContainer}>
                <ProfileHeader />
                <Search />
            </div>
            <Feed />
        </>
    )
}
