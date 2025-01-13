import styles from "@pages/auth/styles/add-post.module.scss"
import { useHttpMutation, METHODS } from "@hooks/useHttp"
import { SubmitHandler, useForm } from "react-hook-form"
import { useOutletContext } from "react-router-dom"
import { IContext, IPost } from "@helpers/types"
import { useRef, useState } from "react"

export const AddPost = () => {
    const { refetch } = useOutletContext<IContext>()
    const [preview, setPreview] = useState<string>("")
    const photo = useRef<HTMLInputElement | null>(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IPost>()
    const [createPost, loading, error] = useHttpMutation<IPost[], FormData>(() => reset())

    const handleChange = () => {
        const file = photo.current?.files?.[0]
        if (!file) return

        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => setPreview(reader.result as string)
    }

    const onSubmit: SubmitHandler<IPost> = (data) => {
        const formData = new FormData()
        const uploadedPhoto = photo.current?.files?.[0]

        formData.append("content", data.title || "")
        if (uploadedPhoto) formData.append("photo", uploadedPhoto)

        try {
            createPost("/posts", METHODS.POST, formData)
            refetch()
            setPreview("")
        } catch (err) {
            console.error("Error while creating post:", err)
        }
    }

    return (
        <section className={styles.addPost}>
            <h2 className={styles.addPost_title}>Add New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <p className={styles.addPost_error}>{error}</p>}
                {errors.title && <p className={styles.addPost_error}>{errors.title.message}</p>}
                <img
                    onClick={() => photo.current?.click()}
                    className={styles.addPost_image}
                    alt="Upload preview"
                    src={
                        preview ||
                        "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png"
                    }
                />
                <input
                    {...register("title", { required: "Content is required" })}
                    placeholder="Enter post content"
                    className={styles.addPost_input}
                />
                <input
                    ref={photo}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    title="Choose a file to upload"
                />
                <button
                    type="submit"
                    className={styles.addPost_button}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </section>
    )
}
