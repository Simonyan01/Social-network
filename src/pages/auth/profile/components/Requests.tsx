import { useHttpQuery, useHttpMutation, METHODS } from "@hooks/useHttp"
import styles from "@pages/auth/styles/requests.module.scss"
import { IResponse, IUser } from "@helpers/types"

export const Requests = () => {
    const { data, refetch } = useHttpQuery<IResponse>("/requests")
    const [handleRequest] = useHttpMutation(refetch)

    const requests: IUser[] | null = data?.payload ? data?.payload as IUser[] : null

    const handleAccept = (id: string) => {
        handleRequest(`/requests/accept/${id}`, METHODS.PATCH)
    }

    const handleDecline = (id: string) => {
        handleRequest(`/requests/decline/${id}`, METHODS.PATCH)
    }

    return (
        <section className={styles.requests}>
            <h1>Requests</h1>
            {requests && requests.length > 0 ? (
                <ul>
                    {requests.map(({ id, name }) => (
                        <li key={id} className={styles.request}>
                            <div className={styles.userInfo}>
                                <p>{name}</p>
                            </div>
                            <div className={styles.actions}>
                                <button
                                    type="button"
                                    onClick={() => handleAccept(id)}
                                    className={styles.acceptButton}
                                >
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDecline(id)}
                                    className={styles.declineButton}
                                >
                                    Decline
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No requests found.</p>
            )}
        </section>
    )
}
