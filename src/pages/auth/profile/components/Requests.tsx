import { useHttpQuery, useHttpMutation, METHODS } from "@hooks/useHttp"
import styles from "@pages/auth/styles/requests.module.scss"
import { IResponse, IRequest } from "@helpers/types"

export const Requests = () => {
    const { data, refetch } = useHttpQuery<IResponse>("/requests")
    const [handleRequestAction] = useHttpMutation(refetch)

    const requests: IRequest[] | null = data?.payload ? data?.payload as IRequest[] : null

    const handleAccept = (id: string) => {
        handleRequestAction(`/requests/accept/${id}`, METHODS.PATCH)
    }

    const handleDecline = (id: string) => {
        handleRequestAction(`/requests/decline/${id}`, METHODS.PATCH)
    }

    return (
        <section className={styles.requests}>
            <h1>Requests</h1>
            {requests && requests.length > 0 ? (
                <ul>
                    {requests.map((request) => (
                        <li key={request.id} className={styles.request}>
                            <div className={styles.userInfo}>
                                <p>{request.username}</p>
                            </div>
                            <div className={styles.actions}>
                                <button onClick={() => handleAccept(request.id)} className={styles.acceptButton}>
                                    Accept
                                </button>
                                <button onClick={() => handleDecline(request.id)} className={styles.declineButton}>
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
