import styles from "@pages/auth/styles/gallery.module.scss"
import { METHODS, useHttpMutation } from "@hooks/useHttp"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { BASE_URL } from "@helpers/constants"
import { DeleteModal } from "./DeleteModal"
import { PostProps } from "@helpers/types"
import { useState } from "react"

export const Post: React.FC<PostProps> = ({ post, onLike, refetch }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [deletePost] = useHttpMutation(refetch)

    const { id, title, picture, isLiked, likes } = post

    const handleDelete = () => {
        deletePost(`/posts/${id}`, METHODS.DELETE)
        setIsOpen(false)
    }

    return (
        <div className={styles.card}>
            <img
                src={`${BASE_URL}${picture}`}
                alt={title}
                className={styles.image}
            />
            <div className={styles.content}>
                <p className={styles.text}>{title || "No content provided"}</p>
                <button
                    type="button"
                    className={styles.likeButton}
                    onClick={() => onLike(id)}
                >
                    {isLiked ? (
                        <FaHeart
                            fontSize={24}
                            className="text-red-500"
                        />
                    ) : (
                        <FaRegHeart
                            fontSize={24}
                            className="text-gray-400"
                        />
                    )}
                    {likes.length > 0 && (
                        <span className={styles.likesCount}>{likes.length}</span>
                    )}
                </button>
                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => setIsOpen(true)}
                >
                    Delete
                </button>
                <DeleteModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    )
}
