import { METHODS, useHttpMutation, useHttpQuery } from "@hooks/useHttp"
import { IPost, IResponse, UserPosts } from "@helpers/types"
import mainStyles from '@pages/auth/styles/main.module.scss'
import styles from "@pages/auth/styles/gallery.module.scss"
import { ClipLoader } from "react-spinners"
import { Post } from "./Post"

export const Gallery: React.FC<UserPosts> = ({ userPosts }) => {
    const { data, loading, refetch } = useHttpQuery<IResponse>("/posts")
    const [likeUser] = useHttpMutation<IResponse, IPost[]>(() => console.log("Liked"))

    const posts: IPost[] = data?.payload as IPost[] ?? []
    const allPosts = userPosts?.length || userPosts?.length === 0 ? userPosts : posts
    const hasPosts = allPosts.length > 0

    const handleLike = (id: string) => {
        likeUser(`/posts/react/${id}`, METHODS.POST)
        refetch()
    }

    if (loading) {
        return (
            <section className={mainStyles.loading}>
                <ClipLoader size={50} color="#3498db" loading={loading} />
            </section>
        )
    }

    return (
        <section className={styles.gallery}>
            <h1 className={styles.title}>Gallery</h1>
            {hasPosts ? (
                <div className={styles.posts}>
                    {allPosts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            onLike={handleLike}
                            refetch={refetch}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.noPosts}>No posts available</div>
            )}
        </section>
    )
}
