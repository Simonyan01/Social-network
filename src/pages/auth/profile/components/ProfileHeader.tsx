import { IContext, IPost, IResponse } from "@helpers/types"
import { useOutletContext } from "react-router-dom"
import { BASE_URL } from "@helpers/constants"
import { useHttpQuery } from "@hooks/useHttp"
import { useRef, useState } from "react"
import { Http } from "@helpers/api"

export const ProfileHeader = () => {
    const [preview, setPreview] = useState<string>("")
    const { user, refetch } = useOutletContext<IContext>()
    const { name, surname, picture, followers, following } = user || {}
    const { data } = useHttpQuery<IResponse>("/posts")

    const posts: IPost[] = data?.payload as IPost[] ?? []
    const photo = useRef<HTMLInputElement | null>(null)
    const uploadedPhoto = photo.current?.files?.[0]

    const handleChange = () => {
        const file = photo.current?.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => setPreview(reader.result as string)
    }

    const handleUpload = () => {
        const file = photo.current?.files?.[0]
        if (!file) return

        const form = new FormData()
        form.append("picture", file)

        Http
            .patch<IResponse>("/profile/upload", form)
            .then(() => {
                refetch()
                setPreview("")
            })
            .catch((error) => {
                console.error("Upload failed:", error)
            })
    }

    const statistics = [
        { label: "Followers", count: followers?.length },
        { label: "Following", count: following?.length },
        { label: "Posts", count: posts.length }
    ]

    return (
        <section className="bg-gray-900 text-slate-300 flex flex-col items-start p-7 rounded-lg shadow-lg">
            <div className="flex items-center gap-6 mb-6">
                <img
                    onClick={() => photo.current?.click()}
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md cursor-pointer hover:scale-105 transition-all duration-300"
                    alt="User avatar"
                    src={
                        picture
                            ? `${BASE_URL}${picture}`
                            : "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png"
                    }
                />
                <h1 className="text-2xl font-bold">{name} {surname}</h1>
                <input
                    ref={photo}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    title="Choose a file to upload"
                />
                {preview && (
                    <div className="flex flex-col items-center bg-gray-800 text-slate-300 p-5 rounded-lg shadow-lg w-full max-w-72 mx-auto">
                        <p className="text-gray-400 text-sm mb-3">
                            {uploadedPhoto?.name}
                        </p>
                        <div className="w-24 h-24 bg-gray-700 flex items-center justify-center rounded-full overflow-hidden mb-3">
                            <img
                                className="object-cover w-full h-full"
                                src={preview}
                                alt="Image preview"
                            />
                        </div>
                        <div className="flex justify-center gap-6 w-full">
                            <button
                                type="button"
                                onClick={handleUpload}
                                className="bg-blue-600 hover:bg-blue-500 text-slate-300 px-3 py-1.5 rounded-md shadow transition text-sm"
                            >
                                Upload
                            </button>
                            <button
                                type="button"
                                onClick={() => setPreview("")}
                                className="bg-gray-600 hover:bg-gray-500 text-slate-300 px-3 py-1.5 rounded-md shadow transition text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex gap-8">
                {statistics.map(({ label, count }) => (
                    <div key={label} className="flex flex-col items-center hover:text-blue-500 transition">
                        <p className="text-lg font-bold text-blue-400">{count}</p>
                        <p className="text-gray-400 text-sm tracking-wide">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}