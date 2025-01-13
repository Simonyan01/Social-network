import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Http } from "@helpers/api"

export enum METHODS {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}

interface IQuery<T> {
  data: T
  loading: boolean
  error: string
  refetch: () => void
  setError: (error: string) => void
  setData: (value: T) => void
}

export const useHttpQuery = <ReturnType>(url: string, mount: boolean = true): IQuery<ReturnType> => {
  const [data, setData] = useState<ReturnType | null>(null)
  const [loading, setLoading] = useState<boolean>(mount)
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()

  const refetch = () => {
    setLoading(true)

    Http.get(url)
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        if (err.status == 403) {
          return navigate("/")
        }
        setError(err.message || "An error occurred")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!mount) return

    refetch()
  }, [url])

  return {
    loading,
    error,
    data: data as ReturnType,
    refetch,
    setError,
    setData,
  }
}

type Mutation<T, V = undefined> = [(url: string, method: METHODS, payload?: V) => void, error: string, loading: boolean | null, data: T]

export const useHttpMutation = <ReturnType, PayloadType = null>(onSuccess: (() => void) | undefined): Mutation<ReturnType, PayloadType> => {
  const [data, setData] = useState<ReturnType | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)
  const [error, setError] = useState<string>("")

  const make = async (url: string, method: METHODS = METHODS.POST, payload?: PayloadType | undefined) => {
    let invocation = null
    setLoading(true)
    try {
      switch (method) {
        case METHODS.GET:
          invocation = Http.get(url)
          break
        case METHODS.POST:
          invocation = Http.post(url, payload)
          break
        case METHODS.PUT:
          invocation = Http.put(url, payload)
          break
        case METHODS.PATCH:
          invocation = Http.patch(url, payload)
          break
        case METHODS.DELETE:
          invocation = Http.delete(url)
          break
        default:
          throw new Error("Unsupported HTTP method")
      }

      const response = await invocation
      setData(response.data)
      setError("")
      onSuccess?.()
    } catch (err: any) {
      setError(err.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return [make, error, loading, data as ReturnType]
}
