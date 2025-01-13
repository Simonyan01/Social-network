import { IAccountContext } from "@helpers/types"
import { createContext } from "react"

export const AccountContext = createContext<IAccountContext | null>(null)
