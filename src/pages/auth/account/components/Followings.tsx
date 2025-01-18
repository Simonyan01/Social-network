import styles from "@pages/auth/styles/followings.module.scss"
import { useHttpQuery } from "@hooks/useHttp"
import { IUser } from "@helpers/types"

export const Followings = () => {
    const { data } = useHttpQuery<{ payload: IUser[] }>("/following")

    const followings = data?.payload ?? []

    return (
        <section className={styles.followings}>
            <h1>Followings</h1>
            {followings.length > 0 ? (
                <ul>
                    {followings.map(({ id, name }) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No followings found.</p>
            )}
        </section>
    )
}
