import styles from "@pages/auth/styles/followers.module.scss"
import { useHttpQuery } from "@hooks/useHttp"
import { IUser } from "@helpers/types"

export const Followers = () => {
    const { data } = useHttpQuery<{ payload: IUser[] }>("/followers")

    const followers = data?.payload ?? []

    return (
        <section className={styles.followers}>
            <h1>Followers</h1>
            {followers.length > 0 ? (
                <ul>
                    {followers.map(({ id, name }) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No followers found.</p>
            )}
        </section>
    )
}
