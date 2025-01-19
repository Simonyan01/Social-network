import { IPost, IResponse, PostProps } from "@helpers/types"
import styles from "@pages/auth/styles/gallery.module.scss"
import { METHODS, useHttpMutation } from "@hooks/useHttp"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { BASE_URL } from "@helpers/constants"
import { DeleteModal } from "./DeleteModal"
import { useState } from "react"

export const Post: React.FC<PostProps> = ({ post, onLike, refetch, account }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [deletePost] = useHttpMutation<IResponse, IPost[]>(refetch)

    const { id, title, userId, picture, isLiked, likes } = post
    const isOwner = userId !== account?.id

    const handleDelete = (id: string) => {
        deletePost(`/posts/${id}`, METHODS.DELETE)
        setIsOpen(false)
    }

    const handleLike = () => {
        if (!isOwner) location.reload()
        onLike(id)
    }

    return (
        <div className={styles.card}>
            <img
                src={`${BASE_URL}${picture}`}
                alt={title}
                className={styles.image}
            />
            <div className={styles.content}>
                <p className={styles.text}>{title}</p>
                <button
                    type="submit"
                    onClick={handleLike}
                    className={`${styles.likeButton}`}
                >
                    {likes.length > 0 || isLiked ? (
                        <FaHeart
                            fontSize={20}
                            className="text-red-500"
                        />
                    ) : (
                        <FaRegHeart
                            fontSize={20}
                            className="text-gray-400"
                        />
                    )}
                    {likes.length > 0 && (
                        <span className={styles.likesCount}>
                            {likes.length}
                        </span>
                    )}
                </button>
                {isOwner && (
                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setIsOpen(true)}
                    >
                        Delete
                    </button>
                )}
                <DeleteModal
                    post={post}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    )
}
