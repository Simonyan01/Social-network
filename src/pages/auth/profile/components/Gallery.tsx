import styles from "@pages/auth/styles/gallery.module.scss"
import { IPost, IResponse } from "@helpers/types"
import { BASE_URL } from "@helpers/constants"
import { useHttpQuery } from "@hooks/useHttp"

export const Gallery = () => {
    const { data, loading } = useHttpQuery<IResponse>("/posts")

    const posts: IPost[] = data?.payload ? data.payload as IPost[] : []

    if (loading) {
        return <div className={styles.loading}>Loading...</div>
    }

    return (
        <section className={styles.gallery}>
            <h1 className={styles.title}>Gallery</h1>
            {posts.length > 0 ? (
                <div className={styles.posts}>
                    {posts.map(({ id, picture, title }) => (
                        <div key={id} className={styles.card}>
                            <img
                                src={`${BASE_URL}${picture}`}
                                alt={title}
                                className={styles.image}
                            />
                            <div className={styles.content}>
                                <p className={styles.text}> {title || "No content provided"} </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.noPosts}>No posts available</div>
            )}
        </section>
    )
}
