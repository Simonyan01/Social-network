import mainStyles from '@pages/auth/styles/main.module.scss'
import { IResponse, IUser } from "@helpers/types"
import { useDebounce } from "@hooks/useDebounce"
import { BASE_URL } from "@helpers/constants"
import { useHttpQuery } from "@hooks/useHttp"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { Link } from "react-router-dom"

export const Search = () => {
    const [text, setText] = useState("")
    const query = useDebounce<string>(text, 500)
    const { data, loading, setData, error, refetch } = useHttpQuery<IResponse>(`/search/${text}`, false)

    const users: IUser[] | null = data ? (data.payload as IUser[]) : null

    useEffect(() => {
        if (!query) return setData({ status: "", payload: [] } as IResponse)

        refetch()
    }, [query])

    return (
        <section className="w-full max-w-md p-4 bg-gray-900 rounded-lg shadow-lg">
            <input
                placeholder="Search for a friend..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-700 text-slate-200 border border-gray-600 shadow-sm rounded-lg transition-all duration-300 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
                {error && <p className="text-red-500">{error}</p>}
                <p className="mb-2 text-lg font-semibold text-gray-300">Results</p>
                {loading ? (
                    <section className={mainStyles.loading}>
                        <ClipLoader
                            size={50}
                            color="#3498db"
                            loading={loading}
                        />
                    </section>
                ) : (
                    <div className="space-y-4">
                        {users?.map(({ id, picture, name, surname }) => (
                            <Link
                                to={`/profile/${id}`}
                                key={id}
                                className="flex items-center p-4 bg-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <img
                                    src={picture ? `${BASE_URL}${picture}` : "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png"}
                                    alt={name}
                                    className="w-14 h-14 rounded-full object-cover border border-gray-500"
                                />
                                <p className="ml-4 text-slate-300">
                                    {name} {surname}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}